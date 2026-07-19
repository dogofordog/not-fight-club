(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const O="not-fight-club-state-v1";function k(){return{screen:"registration",player:{name:"",avatar:"/not-fight-club/avatars/warrior.svg",wins:0,losses:0},battle:null}}function I(){try{const e=localStorage.getItem(O);if(!e)return k();const t=JSON.parse(e);return{...k(),...t,player:{...k().player,...t.player}}}catch{return k()}}function z(e){try{localStorage.setItem(O,JSON.stringify(e))}catch{}}const i=I();function v(e){Object.assign(i,e),z(i)}function g(e){Object.assign(i.player,e),z(i)}function Z(){return`
    <div class="screen screen-registration">
      <h1>Not Fight Club</h1>
      <p class="subtitle">Enter your name to begin</p>
      <form id="registration-form" class="registration-form">
        <input
          type="text"
          id="name-input"
          placeholder="Your fighter name"
          maxlength="20"
          autocomplete="off"
          required
        />
        <button type="submit" id="register-btn" disabled>Enter the Club</button>
      </form>
    </div>
  `}function P(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function H(e,t){const n=[{id:"home",label:"Home"},{id:"character",label:"Character"},{id:"settings",label:"Settings"}];return`
    <nav class="app-nav">
      <div class="nav-identity">
        <img class="nav-avatar" src="${e.avatar}" alt="avatar" />
        <span class="nav-name">${P(e.name)}</span>
      </div>
      <div class="nav-tabs">
        ${n.map(s=>`
          <button
            class="nav-tab ${t===s.id?"active":""}"
            data-action="go-to-screen"
            data-screen="${s.id}"
          >${s.label}</button>
        `).join("")}
      </div>
    </nav>
  `}function N(e){const{player:t,battle:n}=e,s=n?`<p class="resume-notice">You have a battle in progress against ${n.opponent.name}.</p>`:"";return`
    <div class="screen screen-home">
      ${H(t,"home")}
      <div class="home-content">
        <h1>Welcome, ${t.name}</h1>
        ${s}
        <button id="start-battle-btn" data-action="start-battle" class="primary-btn">
          ${n?"Resume Battle":"Start New Battle"}
        </button>
      </div>
    </div>
  `}const S=["head","body","legs"],c="/not-fight-club/",B={head:"Head",body:"Body",legs:"Legs"},b={defendCount:2,baseDamage:15,critChance:.2,critMultiplier:1.5,maxHp:60},x=[{id:"spider",name:"Spider",avatar:`${c}avatars/spider.svg`,attackCount:2,defendCount:1,baseDamage:10,critChance:.15,critMultiplier:1.5,maxHp:40},{id:"troll",name:"Troll",avatar:`${c}avatars/troll.svg`,attackCount:1,defendCount:3,baseDamage:14,critChance:.1,critMultiplier:1.5,maxHp:50},{id:"goblin",name:"Goblin",avatar:`${c}avatars/goblin.svg`,attackCount:1,defendCount:2,baseDamage:18,critChance:.2,critMultiplier:1.5,maxHp:60}],R=[`${c}avatars/warrior.svg`,`${c}avatars/mage.svg`,`${c}avatars/archer.svg`,`${c}avatars/rogue.svg`,`${c}avatars/knight.svg`,`${c}avatars/monk.svg`,`${c}avatars/ranger.svg`,`${c}avatars/paladin.svg`];function j(){return{...x[Math.floor(Math.random()*x.length)]}}function w(e){const t=[...S],n=[];for(let s=0;s<e&&t.length>0;s++){const a=Math.floor(Math.random()*t.length);n.push(t.splice(a,1)[0])}return n}function F(e,t){const{player:n}=e,s=t?`
    <div class="avatar-picker">
      ${R.map(a=>`
        <button
          class="avatar-option ${a===n.avatar?"selected":""}"
          data-action="pick-avatar"
          data-avatar="${a}"
        ><img src="${a}" alt="avatar option" /></button>
      `).join("")}
    </div>
  `:"";return`
    <div class="screen screen-character">
      ${H(n,"character")}
      <div class="character-content">
        <h1>Character</h1>
        <div class="character-avatar"><img src="${n.avatar}" alt="character avatar" /></div>
        <p class="character-name">${n.name}</p>
        <div class="character-record">
          <span class="record-wins">Wins: ${n.wins}</span>
          <span class="record-losses">Losses: ${n.losses}</span>
        </div>
        <button class="secondary-btn" data-action="toggle-avatar-picker">
          ${t?"Close":"Change Avatar"}
        </button>
        ${s}
      </div>
    </div>
  `}function Y(e){const{player:t}=e;return`
    <div class="screen screen-settings">
      ${H(t,"settings")}
      <div class="settings-content">
        <h1>Settings</h1>
        <form id="settings-form" class="settings-form">
          <label for="settings-name-input">Fighter name</label>
          <input
            type="text"
            id="settings-name-input"
            value="${t.name}"
            maxlength="20"
            autocomplete="off"
            required
          />
          <button type="submit" class="primary-btn">Save</button>
        </form>
      </div>
    </div>
  `}function L(e,t,n){const s=Math.max(0,Math.round(e/t*100));return`
    <div class="hp-bar-wrap">
      <div class="hp-bar-label">${n}: ${Math.max(0,e)} / ${t} HP</div>
      <div class="hp-bar-track">
        <div class="hp-bar-fill" style="width: ${s}%"></div>
      </div>
    </div>
  `}function q(e,t){const{player:n,battle:s}=e;if(!s)return'<div class="screen"><p>No battle in progress.</p></div>';const{opponent:a,playerCurrentHp:r,turnNumber:d,log:p,finished:u,result:f}=s,$=S.map(m=>`
    <button
      class="zone-btn ${t.attack===m?"selected":""}"
      data-action="select-attack-zone"
      data-zone="${m}"
      ${u?"disabled":""}
    >${B[m]}</button>
  `).join(""),E=S.map(m=>`
    <button
      class="zone-btn ${t.defend.includes(m)?"selected":""}"
      data-action="select-defend-zone"
      data-zone="${m}"
      ${u?"disabled":""}
    >${B[m]}</button>
  `).join(""),y=!!t.attack&&t.defend.length===b.defendCount,A=u?`
    <div class="battle-result ${f==="win"?"result-win":"result-loss"}">
      <h2>${f==="win"?"Victory!":"Defeat..."}</h2>
      <button class="primary-btn" data-action="end-battle">Back to Home</button>
    </div>
  `:"";return`
    <div class="screen screen-battle">
      ${H(n,"battle")}
      <div class="battle-content">
        <div class="battle-fighters">
          <div class="fighter-card">
            <div class="fighter-avatar"><img src="${n.avatar}" alt="${n.name}" /></div>
            <div class="fighter-name">${n.name}</div>
            ${L(r,b.maxHp,"You")}
          </div>
          <div class="vs-label">VS</div>
          <div class="fighter-card">
            <div class="fighter-avatar"><img src="${a.avatar}" alt="${a.name}" /></div>
            <div class="fighter-name">${a.name}</div>
            ${L(a.currentHp,a.maxHp,a.name)}
          </div>
        </div>

        ${A}

        ${u?"":`
          <div class="turn-info">Turn ${d}</div>
          <div class="zone-selection">
            <div class="zone-group">
              <h3>Attack (pick 1)</h3>
              <div class="zone-buttons">${$}</div>
            </div>
            <div class="zone-group">
              <h3>Defend (pick 2)</h3>
              <div class="zone-buttons">${E}</div>
            </div>
          </div>
          <button
            id="confirm-turn-btn"
            class="primary-btn"
            data-action="confirm-turn"
            ${y?"":"disabled"}
          >Confirm Turn</button>
        `}

        <div class="battle-log">
          <h3>Battle Log</h3>
          <ul class="log-list">
            ${p.map(m=>`<li class="log-entry">${m.text}</li>`).reverse().join("")}
          </ul>
        </div>
      </div>
    </div>
  `}function M({attackerName:e,defenderName:t,zone:n,defenderDefendZones:s,baseDamage:a,critChance:r,critMultiplier:d}){const p=Math.random()<r,u=s.includes(n)&&!p,f=u?0:Math.round(p?a*d:a);return{attackerName:e,defenderName:t,zone:n,damage:f,isCrit:p,isBlocked:u}}function D(e){const t=B[e.zone];return e.isBlocked?{...e,text:`<span class="log-who">${e.attackerName}</span> attacked <span class="log-whom">${e.defenderName}</span>'s <span class="log-zone">${t}</span> — <span class="log-blocked">BLOCKED</span> (0 dmg)`}:{...e,text:`<span class="log-who">${e.attackerName}</span> attacked <span class="log-whom">${e.defenderName}</span>'s <span class="log-zone">${t}</span> for <span class="log-damage">${e.damage} dmg</span>${e.isCrit?' <span class="log-crit">CRITICAL!</span>':""}`}}function K({playerName:e,playerAttackZone:t,playerDefendZones:n,opponent:s,playerProfile:a}){const r=w(s.attackCount),d=w(s.defendCount),p=[];let u=0,f=0;const $=M({attackerName:e,defenderName:s.name,zone:t,defenderDefendZones:d,baseDamage:a.baseDamage,critChance:a.critChance,critMultiplier:a.critMultiplier});u+=$.damage,p.push(D($));for(const E of r){const y=M({attackerName:s.name,defenderName:e,zone:E,defenderDefendZones:n,baseDamage:s.baseDamage,critChance:s.critChance,critMultiplier:s.critMultiplier});f+=y.damage,p.push(D(y))}return{logEntries:p,playerDamageTaken:f,opponentDamageTaken:u,opponentAttackZones:r,opponentDefendZones:d}}const T=document.getElementById("app");let h=!1,l={attack:null,defend:[]};function C(){l={attack:null,defend:[]}}function o(){let e="";switch(i.screen){case"registration":e=Z();break;case"home":e=N(i);break;case"character":e=F(i,h);break;case"settings":e=Y(i);break;case"battle":e=q(i,l);break;default:e=N(i)}T.innerHTML=e,V()}function V(){const e=document.getElementById("registration-form");if(e){const n=document.getElementById("name-input"),s=document.getElementById("register-btn");n.addEventListener("input",()=>{s.disabled=n.value.trim().length===0}),e.addEventListener("submit",a=>{a.preventDefault();const r=n.value.trim();r&&(g({name:r}),v({screen:"home"}),o())})}const t=document.getElementById("settings-form");t&&t.addEventListener("submit",n=>{n.preventDefault();const a=document.getElementById("settings-name-input").value.trim();a&&(g({name:a}),o())})}function _(){if(i.battle){v({screen:"battle"}),C(),o();return}const e=j(),t={opponent:{...e,currentHp:e.maxHp},playerCurrentHp:b.maxHp,turnNumber:1,log:[],finished:!1,result:null};v({screen:"battle",battle:t}),C(),o()}function G(){const e=i.battle;if(!e||e.finished||!l.attack||l.defend.length!==b.defendCount)return;const{logEntries:t,playerDamageTaken:n,opponentDamageTaken:s}=K({playerName:i.player.name,playerAttackZone:l.attack,playerDefendZones:l.defend,opponent:e.opponent,playerProfile:b});e.opponent.currentHp=Math.max(0,e.opponent.currentHp-s),e.playerCurrentHp=Math.max(0,e.playerCurrentHp-n),e.log.push(...t),e.opponent.currentHp<=0&&e.playerCurrentHp<=0?(e.finished=!0,e.result="loss",g({losses:i.player.losses+1})):e.opponent.currentHp<=0?(e.finished=!0,e.result="win",g({wins:i.player.wins+1})):e.playerCurrentHp<=0?(e.finished=!0,e.result="loss",g({losses:i.player.losses+1})):e.turnNumber+=1,v({battle:e}),C(),o()}function J(){v({screen:"home",battle:null}),C(),o()}T.addEventListener("click",e=>{const t=e.target.closest("[data-action]");if(!t)return;switch(t.dataset.action){case"go-to-screen":v({screen:t.dataset.screen}),h=!1,o();break;case"toggle-avatar-picker":h=!h,o();break;case"pick-avatar":g({avatar:t.dataset.avatar}),h=!1,o();break;case"start-battle":_();break;case"select-attack-zone":l.attack=t.dataset.zone,o();break;case"select-defend-zone":{const s=t.dataset.zone,a=l.defend.indexOf(s);a>=0?l.defend.splice(a,1):l.defend.length<b.defendCount&&l.defend.push(s),o();break}case"confirm-turn":G();break;case"end-battle":J();break}});!i.player.name&&i.screen!=="registration"&&v({screen:"registration"});o();
