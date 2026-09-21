import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC = join(ROOT, 'public');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 4173);
const REPOSITORY = process.env.GITHUB_REPO || 'SuperlikersGlobal/Status';
const TOKEN = (process.env.GITHUB_TOKEN || '').trim();
const PARTS = REPOSITORY.split('/');
const OWNER = PARTS[0];
const REPO = PARTS[1];
const LIVE = Boolean(TOKEN && OWNER && REPO);
const META_RE = /<!-- STATUS_V0\s*([\s\S]*?)\s*-->/;
const ALLOWED = new Set(['backlog','ready','in_progress','blocked','done']);
let demoTasks = JSON.parse(await readFile(join(ROOT,'data','demo.json'),'utf8'));
const demoComments = new Map();

function send(res,status,payload,type) {
  const body = Buffer.isBuffer(payload) ? payload : (typeof payload === 'string' ? payload : JSON.stringify(payload));
  res.writeHead(status,{'Content-Type':type || (Buffer.isBuffer(payload) ? 'application/octet-stream' : (typeof payload === 'string' ? 'text/plain; charset=utf-8' : 'application/json; charset=utf-8')),'Cache-Control':'no-store'});
  res.end(body);
}

function meta(body) {
  const m = (body || '').match(META_RE);
  if (!m) return null;
  try { return JSON.parse(m[1].trim()); } catch { return null; }
}

function replaceMeta(body,data) {
  const block = '<!-- STATUS_V0\n' + JSON.stringify(data) + '\n-->';
  return META_RE.test(body || '') ? body.replace(META_RE,block) : block + '\n\n' + (body || '');
}

function section(body,heading) {
  const key = '## ' + heading;
  const start = (body || '').indexOf(key);
  if (start < 0) return '';
  const after = (body || '').slice(start + key.length).replace(/^\s*\n/,'');
  const end = after.indexOf('\n## ');
  return (end < 0 ? after : after.slice(0,end)).trim();
}

function task(issue) {
  const m = meta(issue.body);
  if (!m) return null;
  return {
    number: issue.number,
    title: issue.title.replace(/^\[[^\]]+\]\s*/,''),
    url: issue.html_url,
    state: issue.state,
    commentsCount: issue.comments || 0,
    project: m.project || 'Sin proyecto',
    owner: m.owner || 'Sin responsable',
    status: m.status || 'backlog',
    priority: m.priority || 'medium',
    start: m.start || null,
    due: m.due || null,
    order: Number(m.order || 999),
    summary: section(issue.body,'Qué estamos haciendo'),
    why: section(issue.body,'Por qué importa'),
    acceptance: section(issue.body,'Criterio de finalización').split('\n').map(function(x){return x.replace(/^\s*[-*]\s+/,'').trim();}).filter(Boolean),
    technical: section(issue.body,'Detalle técnico')
  };
}

async function gh(path,options) {
  const response = await fetch('https://api.github.com' + path,{
    ...(options || {}),
    headers:{
      Accept:'application/vnd.github+json',
      Authorization:'Bearer ' + TOKEN,
      'X-GitHub-Api-Version':'2022-11-28',
      'Content-Type':'application/json'
    }
  });
  if (!response.ok) throw new Error('GitHub ' + response.status + ': ' + (await response.text()).slice(0,400));
  return response.status === 204 ? null : response.json();
}

async function liveTasks() {
  const issues = await gh('/repos/' + OWNER + '/' + REPO + '/issues?state=all&per_page=100');
  return issues.filter(function(i){return !i.pull_request && i.body && i.body.includes('STATUS_V0');}).map(task).filter(Boolean).sort(function(a,b){return a.order-b.order;});
}

async function patchStatus(number,status) {
  if (!ALLOWED.has(status)) throw new Error('Estado inválido.');
  const issue = await gh('/repos/' + OWNER + '/' + REPO + '/issues/' + number);
  const m = meta(issue.body);
  if (!m) throw new Error('La issue no pertenece a Status v0.');
  m.status = status;
  const updated = await gh('/repos/' + OWNER + '/' + REPO + '/issues/' + number,{
    method:'PATCH',
    body:JSON.stringify({body:replaceMeta(issue.body,m),state:status === 'done' ? 'closed' : 'open',state_reason:status === 'done' ? 'completed' : undefined})
  });
  return task(updated);
}

async function jsonBody(req) {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  if (!raw) return {};
  return JSON.parse(raw);
}

async function api(req,res,url) {
  if (req.method === 'GET' && url.pathname === '/api/status') return send(res,200,{mode:LIVE?'github':'demo',repository:REPOSITORY,writable:LIVE});
  if (req.method === 'GET' && url.pathname === '/api/tasks') {
    try { return send(res,200,LIVE ? await liveTasks() : demoTasks); } catch(e) { return send(res,502,{error:e.message}); }
  }

  const tm = url.pathname.match(/^\/api\/tasks\/(\d+)$/);
  if (tm && req.method === 'PATCH') {
    try {
      const body = await jsonBody(req);
      if (!ALLOWED.has(body.status)) return send(res,400,{error:'Estado inválido.'});
      if (LIVE) return send(res,200,await patchStatus(tm[1],body.status));
      const t = demoTasks.find(function(x){return String(x.number) === tm[1];});
      if (!t) return send(res,404,{error:'Tarea no encontrada.'});
      t.status = body.status;
      t.state = body.status === 'done' ? 'closed' : 'open';
      return send(res,200,t);
    } catch(e) { return send(res,500,{error:e.message}); }
  }

  const cm = url.pathname.match(/^\/api\/tasks\/(\d+)\/comments$/);
  if (cm && req.method === 'GET') {
    try {
      if (LIVE) {
        const comments = await gh('/repos/' + OWNER + '/' + REPO + '/issues/' + cm[1] + '/comments?per_page=100');
        return send(res,200,comments.map(function(c){return {id:c.id,author:c.user && c.user.login || 'GitHub',body:c.body,createdAt:c.created_at,url:c.html_url};}));
      }
      return send(res,200,demoComments.get(cm[1]) || []);
    } catch(e) { return send(res,500,{error:e.message}); }
  }

  if (cm && req.method === 'POST') {
    try {
      const input = await jsonBody(req);
      if (!input.body || !input.body.trim()) return send(res,400,{error:'La actualización está vacía.'});
      if (LIVE) {
        const c = await gh('/repos/' + OWNER + '/' + REPO + '/issues/' + cm[1] + '/comments',{method:'POST',body:JSON.stringify({body:input.body.trim()})});
        return send(res,201,{id:c.id,author:c.user && c.user.login || 'GitHub',body:c.body,createdAt:c.created_at,url:c.html_url});
      }
      const list = demoComments.get(cm[1]) || [];
      const c = {id:Date.now(),author:'demo',body:input.body.trim(),createdAt:new Date().toISOString(),url:null};
      list.push(c); demoComments.set(cm[1],list); return send(res,201,c);
    } catch(e) { return send(res,500,{error:e.message}); }
  }

  return send(res,404,{error:'Endpoint no encontrado.'});
}

const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8'};
async function staticFile(res,pathname) {
  const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const safe = normalize(requested).replace(/^(\.\.(\/|\\|$))+/, '');
  const file = join(PUBLIC,safe);
  if (!file.startsWith(PUBLIC)) return send(res,403,'Forbidden');
  try { return send(res,200,await readFile(file),mime[extname(file)] || 'application/octet-stream'); }
  catch {
    try { return send(res,200,await readFile(join(PUBLIC,'index.html')),'text/html; charset=utf-8'); }
    catch { return send(res,404,'Not found'); }
  }
}

createServer(async function(req,res){
  const url = new URL(req.url || '/','http://' + (req.headers.host || 'localhost'));
  if (url.pathname.startsWith('/api/')) return api(req,res,url);
  return staticFile(res,url.pathname);
}).listen(PORT,HOST,function(){
  console.log('Status v0 running on http://' + HOST + ':' + PORT);
  console.log(LIVE ? 'Modo GitHub live: ' + REPOSITORY : 'Modo demo: configura GITHUB_TOKEN para escribir en GitHub.');
});
