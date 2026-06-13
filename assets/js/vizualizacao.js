
const locaisGeo = [
  { id: 3, nome: "Serra do Rola-Moça",      tipo: "Turismo",       endereco: "Serra do Rola Moça - Ibirité, MG",                        lat: -20.0413, lng: -44.0100, cor: "#2d7a52", icone: "🌿", avaliacao: 4.8 },
  { id: 3, nome: "Museu Helena Antipoff",    tipo: "Turismo",       endereco: "Av. São Paulo, 3996 - Vila do Rosário, Ibirité",           lat: -20.0158, lng: -44.0849, cor: "#2d7a52", icone: "🏛️", avaliacao: 4.5 },
  { id: 3, nome: "Cachoeira das Pitangueiras", tipo: "Turismo",     endereco: "Serra do Rola-Moça - Ibirité, MG",                        lat: -20.0310, lng: -44.0590, cor: "#2d7a52", icone: "💧", avaliacao: 4.8 },
  { id: 3, nome: "Mirante Morro dos Veados", tipo: "Turismo",       endereco: "Estrada para Casa Branca - Serra do Rola-Moça, Ibirité",  lat: -20.0490, lng: -44.0450, cor: "#2d7a52", icone: "🦌", avaliacao: 4.7 },
  { id: 3, nome: "Mirante Três Pedras",      tipo: "Turismo",       endereco: "Serra do Curral - Belo Horizonte, MG",                    lat: -19.9552, lng: -43.9083, cor: "#2d7a52", icone: "🪨", avaliacao: 4.9 },
  { id: 2, nome: "Estação Ferroviária",      tipo: "Cultura",       endereco: "R. Arthur Campos, 172 - Aluoto, Ibirité",                 lat: -20.0221, lng: -44.0610, cor: "#c9882a", icone: "🚂", avaliacao: 4.7 },
  { id: 4, nome: "Churrascaria Fazenda Viganó", tipo: "Cultura",    endereco: "Rod. MG-040, 1799 - Quintas da Jangada 2, Ibirité",       lat: -20.0279, lng: -44.0929, cor: "#c9882a", icone: "🥩", avaliacao: 4.4 },
  { id: 4, nome: "Restaurante Estrada Velha", tipo: "Cultura",      endereco: "Rod. MG-040, Km 21 - Vila Nova Esperança, Ibirité",       lat: -20.0340, lng: -44.0850, cor: "#c9882a", icone: "🍽️", avaliacao: 4.3 },
  { id: 1, nome: "Praça JK",                tipo: "Centro Urbano",  endereco: "Av. Mal. Hermes, 752-890 - Palmares, Ibirité",            lat: -20.0188, lng: -44.0555, cor: "#1f5c3a", icone: "🏙️", avaliacao: 4.2 },
  { id: 5, nome: "Prefeitura Municipal",     tipo: "Centro Urbano",  endereco: "R. Arthur Campos, 906 - Alvorada, Ibirité",              lat: -20.0230, lng: -44.0578, cor: "#1f5c3a", icone: "🏛️", avaliacao: 3.9 },
  { id: 1, nome: "Centro de Ibirité",        tipo: "Centro Urbano",  endereco: "Ibirité - MG, 32400-000",                                lat: -20.0252, lng: -44.0569, cor: "#1f5c3a", icone: "📍", avaliacao: 4.2 }
];

const coresTipo = {
  "Turismo":       "#2d7a52",
  "Cultura":       "#c9882a",
  "Centro Urbano": "#1f5c3a"
};

function renderStats() {
  var todos = getTodosLocais();
  var totalAtracoes = todos.reduce(function(acc, l) { return acc + (l.fotos ? l.fotos.length : 0); }, 0);
  var destaques = getLocaisDestaque().length;
  var stats = [
    { num: todos.length,  lbl: "Categorias de Locais" },
    { num: totalAtracoes, lbl: "Atrações Cadastradas" },
    { num: destaques,     lbl: "Destaques" },
    { num: "4.5★",        lbl: "Avaliação Média" },
    { num: "170 mil",     lbl: "Habitantes" },
    { num: "130",         lbl: "Bairros" }
  ];
  document.getElementById("stats-row").innerHTML = stats.map(function(s) {
    return '<div class="stat-card"><strong class="stat-num">' + s.num + '</strong><span class="stat-lbl">' + s.lbl + '</span></div>';
  }).join("");
}

function initMap() {
  var map = L.map('map', { center: [-20.0300, -44.0600], zoom: 12 });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);

  var tiposUsados = {};
  locaisGeo.forEach(function(local) {
    var cor = coresTipo[local.tipo] || "#1f5c3a";
    tiposUsados[local.tipo] = cor;
    var iconeEl = L.divIcon({
      className: '',
      html: '<div class="marcador-custom" style="background:' + cor + ';">' + local.icone + '</div>',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -22]
    });
    var marker = L.marker([local.lat, local.lng], { icon: iconeEl });
    marker.bindPopup(
      '<span class="popup-tipo">' + local.tipo + '</span>' +
      '<p class="popup-nome">' + local.nome + '</p>' +
      '<p class="popup-info">📍 ' + local.endereco + '</p>' +
      '<p class="popup-info">⭐ Avaliação: <strong>' + local.avaliacao + '</strong> / 5.0</p>' +
      '<a class="popup-link" href="detalhe.html?id=' + local.id + '">Ver detalhes &rarr;</a>'
    );
    marker.addTo(map);
  });

  var legendEl = document.getElementById('map-legend');
  legendEl.innerHTML = Object.entries(tiposUsados).map(function(entry) {
    return '<div class="legend-item"><div class="legend-dot" style="background:' + entry[1] + '"></div><span><strong>' + entry[0] + '</strong></span></div>';
  }).join('') +
  '<div class="legend-item" style="margin-left:1rem; color: var(--texto-claro); font-size:0.78rem;">(' + locaisGeo.length + ' locais mapeados)</div>';
}

function initChartBarras() {
  var todos = getTodosLocais();
  var labels = todos.map(function(l) { return l.nome.length > 18 ? l.nome.substring(0, 18) + '…' : l.nome; });
  var valores = todos.map(function(l) { return l.fotos ? l.fotos.length : 0; });
  var cores = ['#1f5c3a','#2d7a52','#4aab74','#c9882a','#e8b04a','#7a9a8a'];
  new Chart(document.getElementById('chartBarras').getContext('2d'), {
    type: 'bar',
    data: { labels: labels, datasets: [{ label: 'Nº de Atrações', data: valores, backgroundColor: cores, borderRadius: 8, borderSkipped: false }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(ctx) { return ' ' + ctx.parsed.y + ' atração(ões)'; } } } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1, font: { family: 'Sora', size: 11 } }, grid: { color: 'rgba(0,0,0,0.06)' } },
        x: { ticks: { font: { family: 'Sora', size: 10 }, maxRotation: 35, minRotation: 20 }, grid: { display: false } }
      }
    }
  });
}

function initChartAvaliacao() {
  var labels = locaisGeo.map(function(l) { return l.nome.length > 22 ? l.nome.substring(0, 22) + '…' : l.nome; });
  var valores = locaisGeo.map(function(l) { return l.avaliacao; });
  var cores   = locaisGeo.map(function(l) { return coresTipo[l.tipo] || '#1f5c3a'; });
  new Chart(document.getElementById('chartAvaliacao').getContext('2d'), {
    type: 'bar',
    data: { labels: labels, datasets: [{ label: 'Avaliação (0–5)', data: valores, backgroundColor: cores, borderRadius: 8, borderSkipped: false }] },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(ctx) { return ' ⭐ ' + ctx.parsed.x + ' / 5.0'; } } } },
      scales: {
        x: { beginAtZero: true, max: 5, ticks: { font: { family: 'Sora', size: 11 } }, grid: { color: 'rgba(0,0,0,0.06)' } },
        y: { ticks: { font: { family: 'Sora', size: 10 } }, grid: { display: false } }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  renderStats();
  initMap();
  initChartBarras();
  initChartAvaliacao();

  var navToggle = document.getElementById("nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", function() {
      document.getElementById("nav-mobile").classList.toggle("open");
    });
  }
});
