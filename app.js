const bossHealth = document.getElementById('healthBar')
const bossLevel = document.getElementById('bossLevel')
const bossDefeated = document.getElementById('monstersDefeated')
const gold = document.getElementById('gold')
const levelCost = document.getElementById('levelCost')

const heroes = [
  {
    name: 'Slate Slabrock',
    type: 'dwarf',
    damage: 5,
    originalDamage: 5,
    health: 100,
    maxHealth: 100,
    originalHealth: 100,
    isAlive: true,
    level: 1
  },
  {
    name: 'Flint Ironstag',
    type: 'elf',
    damage: 10,
    originalDamage: 10,
    health: 50,
    maxHealth: 100,
    originalHealth: 50,
    isAlive: true,
    level: 1
  }
]

const boss = {
  health: 100,
  maxHealth: 100,
  originalHealth: 100,
  damage: 5,
  originalDamage: 5,
  level: 1,
  defeatedCount: 0,
  reward: 10,
  originalReward: 10
}

let totalGold = 20
let levelUpCost = 50

function attackBoss() {
  heroes.forEach(hero => {
    if (hero.isAlive) {
      boss.health -= hero.damage
    }
  })

  if (boss.health <= 0) {
    boss.level++
    totalGold += boss.reward
    checkLevel("", false)
  }

  drawHealth()
}

function drawHealth() {
  heroes.forEach(hero => {
    let heroLevel = document.getElementById(`level${hero.type}`)
    let heroHealth = document.getElementById(`${hero.type}Health`)
    heroLevel.innerText = hero.level
    heroHealth.innerText = hero.health
  });

  bossDefeated.innerText = boss.defeatedCount
  bossLevel.innerText = boss.level
  gold.innerText = totalGold
  levelCost.innerText = levelUpCost
  bossHealth.innerHTML = `
    <div class="progress-bar bg-danger" role = "progressbar" aria - valuenow="70" aria - valuemin="0"
  aria - valuemax="100" style = "width:${boss.health / boss.maxHealth * 100}%" >
    </div>`
}

function bossAttack() {
  heroes.forEach(hero => hero.health -= boss.damage)
  endGame()
  drawHealth()
}

function endGame() {
  let killedHeroes = 0
  heroes.forEach(hero => {
    if (hero.health < 0) {
      killedHeroes++
      hero.health = 0
      hero.isAlive = false
    }
  })
  if (killedHeroes == heroes.length) {
    window.alert('Game Over!')
    resetGame()
  }
}

function buyPotion(heroName) {
  let foundHero = heroes.find(hero => hero.type == heroName)
  if (totalGold >= 20 && foundHero.isAlive) {
    totalGold -= 20
    foundHero.health += 10
  }
  drawHealth()
}

function levelUp(heroName) {
  let foundHero = heroes.find(hero => hero.type == heroName)
  if (totalGold >= levelUpCost && foundHero.isAlive) {
    totalGold -= levelUpCost
    foundHero.level++
    levelUpCost += foundHero.level * 20
    checkLevel(foundHero, false)
  }
  drawHealth()
}

function resetGame() {
  heroes.forEach(hero => {
    hero.isAlive = true
    hero.level = 1
    boss.level = 1
    checkLevel(hero, true)
  });
}

function checkLevel(hero, isReset) {
  if (isReset) {
    hero.maxHealth = hero.originalHealth
    hero.damage = hero.originalDamage
    boss.maxHealth = boss.originalHealth
    boss.reward = boss.originalReward
    boss.damage = boss.originalDamage
    totalGold = 20
  } else {
    hero.maxHealth = hero.maxHealth + (hero.level * 30)
    hero.damage = hero.damage * hero.level
    boss.maxHealth = boss.maxHealth + (boss.level * 10)
    boss.reward = boss.reward + (boss.level * 2)
    boss.damage = boss.damage + (boss.level * 0.25)
  }
  hero.health = hero.maxHealth
  boss.health = boss.maxHealth
  boss.defeatedCount = boss.level - 1
  levelUpCost = 50
}

drawHealth()
setInterval(bossAttack, 1000)