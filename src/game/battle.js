import { ZONE_LABELS, pickRandomZones } from './config.js';

function resolveHit({ attackerName, defenderName, zone, defenderDefendZones, baseDamage, critChance, critMultiplier }) {
  const isCrit = Math.random() < critChance;
  const isBlocked = defenderDefendZones.includes(zone) && !isCrit;
  const damage = isBlocked ? 0 : Math.round(isCrit ? baseDamage * critMultiplier : baseDamage);

  return { attackerName, defenderName, zone, damage, isCrit, isBlocked };
}

export function logEntryText(hit) {
  const zoneLabel = ZONE_LABELS[hit.zone];
  if (hit.isBlocked) {
    return {
      ...hit,
      text: `<span class="log-who">${hit.attackerName}</span> attacked <span class="log-whom">${hit.defenderName}</span>'s <span class="log-zone">${zoneLabel}</span> — <span class="log-blocked">BLOCKED</span> (0 dmg)`,
    };
  }
  return {
    ...hit,
    text: `<span class="log-who">${hit.attackerName}</span> attacked <span class="log-whom">${hit.defenderName}</span>'s <span class="log-zone">${zoneLabel}</span> for <span class="log-damage">${hit.damage} dmg</span>${hit.isCrit ? ' <span class="log-crit">CRITICAL!</span>' : ''}`,
  };
}

export function resolveTurn({ playerName, playerAttackZone, playerDefendZones, opponent, playerProfile }) {
  const opponentAttackZones = pickRandomZones(opponent.attackCount);
  const opponentDefendZones = pickRandomZones(opponent.defendCount);

  const logEntries = [];
  let opponentDamageTaken = 0;
  let playerDamageTaken = 0;

  const playerHit = resolveHit({
    attackerName: playerName,
    defenderName: opponent.name,
    zone: playerAttackZone,
    defenderDefendZones: opponentDefendZones,
    baseDamage: playerProfile.baseDamage,
    critChance: playerProfile.critChance,
    critMultiplier: playerProfile.critMultiplier,
  });
  opponentDamageTaken += playerHit.damage;
  logEntries.push(logEntryText(playerHit));

  for (const zone of opponentAttackZones) {
    const oppHit = resolveHit({
      attackerName: opponent.name,
      defenderName: playerName,
      zone,
      defenderDefendZones: playerDefendZones,
      baseDamage: opponent.baseDamage,
      critChance: opponent.critChance,
      critMultiplier: opponent.critMultiplier,
    });
    playerDamageTaken += oppHit.damage;
    logEntries.push(logEntryText(oppHit));
  }

  return { logEntries, playerDamageTaken, opponentDamageTaken, opponentAttackZones, opponentDefendZones };
}
