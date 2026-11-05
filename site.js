/* Port Haven — gedeelde scripts */
(function () {
  // Uithangbord: menu op mobiel
  var toggle = document.querySelector('.signboard .menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = toggle.parentNode.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // D&D spelen: de d20 gooien
  var rollBtn = document.getElementById('rollBtn');
  if (rollBtn) {
    var out = document.getElementById('result');
    rollBtn.addEventListener('click', function () {
      var bonus = parseInt(document.getElementById('bonus').value, 10);
      var dc = parseInt(document.getElementById('dc').value, 10);
      var d = Math.floor(Math.random() * 20) + 1;
      var total = d + bonus;
      var ok = total >= dc;
      out.innerHTML = 'Je gooit <b>' + d + '</b> + ' + bonus + ' = <b>' + total + '</b> tegen DC ' + dc + ': ' +
        (ok ? '<span class="yes">gelukt, je staat bovenop de muur.</span>' : '<span class="no">mislukt, je glijdt terug naar beneden.</span>');
    });
  }

  // Het prikbord: gevaar berekenen
  var crsel = document.getElementById('crsel');
  if (crsel) {
    var B = {1:[50,75,100],2:[100,150,200],3:[150,225,400],4:[250,375,500],5:[500,750,1100],6:[600,1000,1400],7:[750,1300,1700],8:[1000,1700,2100]};
    var ids = ['p1','p2','p3','p4'];
    var start = ['1','1','2','2'];
    ids.forEach(function (id, i) { document.getElementById(id).value = start[i]; });
    var fmt = function (n) { return n.toLocaleString('nl-BE'); };
    var update = function () {
      var t = [0,0,0], n = 0;
      ids.forEach(function (id) { var l = +document.getElementById(id).value; if (l) { n++; for (var k = 0; k < 3; k++) t[k] += B[l][k]; } });
      var xp = +crsel.value;
      for (var k = 0; k < 3; k++) document.getElementById('b' + k).textContent = fmt(t[k]);
      var idx = n === 0 ? -1 : (xp <= t[0] ? 0 : xp <= t[1] ? 1 : xp <= t[2] ? 2 : 3);
      for (var j = 0; j < 4; j++) document.getElementById('s' + j).classList.toggle('on', j === idx);
      var names = ['licht','gemiddeld','zwaar','levensgevaarlijk'];
      document.getElementById('verdict').innerHTML = n === 0 ? 'Kies minstens één speler.' :
        'Gevaar van <b>' + fmt(xp) + ' XP</b> voor deze party: <b>' + names[idx] + '</b>.';
    };
    ids.concat(['crsel']).forEach(function (id) { document.getElementById(id).addEventListener('change', update); });
    update();
  }
})();
