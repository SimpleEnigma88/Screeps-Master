var roleSKAttacker = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        var spawnNames = creep.room.find(FIND_MY_SPAWNS);
        var hostiles = [];
        var mineralNode = creep.room.find(FIND_MINERALS);
        Game.rooms[creep.room.name].memory.mineralID = mineralNode[0].id;
        hostiles = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function (c) {
                return c.owner.username != 'deft-code1'
            }
        });
        hostiles.sort(function (a, b) {
            return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
        })
        
        var returnHome = true;
        var myAttackers = creep.room.find(FIND_MY_CREEPS, {
            filter: function (c) {
                return c.memory.role == 'SKAttacker' && c.memory.targetRoom == creep.memory.targetRoom;
            }
        });
        var targets = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function (c) {
                        return c.hits < c.hitsMax  && creep.pos.getRangeTo(c) > 0 && creep.pos.getRangeTo(c) < 15;
                    }
                });
                
        if (targets && creep.pos.getRangeTo(targets) < 5) creep.heal(targets[0]);
        //console.log('TEsT :   ' + myAttackers.length);
        //var myAttackersNear = creep.room.find(FIND_MY_CREEPS, (c) => c.memory.role == 'SKAttacker' && c.memory.targetRoom == creep.memory.targetRoom && c.pos.getRangeTo(creep) < 5);
        var target = creep.room.find(FIND_HOSTILE_STRUCTURES, {
            filter: function(s) {
                return s.structureType == STRUCTURE_KEEPER_LAIR && s.ticksToSpawn > 0/* && s.pos.getRangeTo(mineralNode[0]) > 4*/;
            }
        });
        target.sort(function(a,b) {
            return a.ticksToSpawn - b.ticksToSpawn;
        });
        //console.log(target);

        if(creep.hits < creep.hitsMax * .6) {
            creep.heal(creep);
            creep.say('Critical Repair!')
            creep.rangedAttack(hostiles[0]);
        }
        if(creep.hits < creep.hitsMax && (hostiles.length == 0 || creep.pos.getRangeTo(hostiles[0]) > 6)) {
            creep.heal(creep);
            creep.say('Repair!')
        }
        if (creep.room.name != creep.memory.targetRoom) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            
        }
        else {
            if (hostiles.length == 0 && targets) {
                
                if (targets && creep.pos.getRangeTo(targets) < 15) {
                    if (creep.heal(targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, { maxRooms: 1, ignoreCreeps: true });
                        creep.rangedHeal(targets);
                        creep.say('Healing!');
                    }
                }
                else if(creep.hits < creep.hitsMax){
                        creep.heal(creep);
                }
                
            }
            else if (hostiles.length > 0) {
                //console.log(creep.name + ' bogus');
                if (creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
                    if (Game.time % 1 == 0 && creep.pos.getRangeTo(hostiles[0]) < 4 && creep.pos.getRangeTo(hostiles[0]) > 1) {
                        creep.rangedAttack(hostiles[0]);
                    }
                    creep.moveTo(hostiles[0], { maxRooms: 1});
                }
                else {
                    creep.attack(hostiles[0]);
                    
                }
            }
            else if (targets && creep.pos.getRangeTo(targets) < 15) {
                //console.log('DamagedCreeps: ' + targets);
                if (creep.heal(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, { maxRooms: 1, ignoreCreeps: true });
                    creep.rangedHeal(targets);
                }
            }
            else {
                //console.log('LAIR ' + target );
                if (target[0]) {
                   creep.moveTo(target[0], { maxRooms: 1});
                }
                else {
                   creep.moveTo(25,25);
                   }
               }
            }
        }
    };

module.exports = roleSKAttacker;