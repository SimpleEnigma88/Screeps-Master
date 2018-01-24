var roleInvader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.suicide();
        var spawnNames = creep.room.find(FIND_MY_SPAWNS);
        var hostiles = [];
        if (creep.memory.targetRoom == creep.room.name) {
            hostiles = creep.room.find(FIND_HOSTILE_CREEPS, {
                filter: function (c) {
                    return c.owner.username != 'Baldey'
                }
            });
            hostiles.sort(function (a, b) {
                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
            })
            if (hostiles.length > 0) {
                creep.memory.engaged = true;
            }
        }
        var returnHome = true;
        var myAttackers = creep.room.find(FIND_MY_CREEPS, (creep) => creep.memory.role == 'Attacker')
        var target = creep.room.find(FIND_HOSTILE_STRUCTURES);
        //console.log(target);

        if(creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }
        if (creep.memory.boosted != true) {
            var boosterLab = Game.getObjectById('58d2ea855f6b864619792495');
            if (boosterLab.boostCreep(creep) == ERR_NOT_IN_RANGE && creep.pos.getRangeTo(boosterLab) > 1) {
                creep.moveTo(boosterLab);
            }
        }
        if (creep.room.name != creep.memory.targetRoom && creep.memory.boosted == true) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else if ( creep.memory.boosted == true) {
            if (hostiles.length == 0) {
                creep.memory.engaged = false;
            }
            var targets = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function (creep) {
                    return creep.hits < creep.hitsMax;
                }
            });

            if (creep.moveTo(target[0]) == ERR_NO_PATH) {
                var wallRamps = creep.room.find(FIND_STRUCTURES, (s) => s.structureType == (STRUCTURE_RAMPART || STRUCTURE_WALL));
                wallRamps.sort(function (a, b) {
                    return a.hits - b.hits;
                });
                if (creep.attack(creep.pos.findClosestByRange(target) == ERR_NOT_IN_RANGE)) creep.moveTo(target[0]);
            }
            else if (targets && creep.pos.getRangeTo(targets) < 5) {
                if (creep.heal(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, { maxRooms: 1, ignoreCreeps: true });
                    creep.rangedHeal(targets);
                    //console.log('DamagedCreeps: ' + targets);
                }
            }
            else {
                if(creep.hits < creep.hitsMax){
                    creep.heal(creep);
                }
            }

            if (hostiles.length > 0 && myAttackers.length > 0) {

                if (creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
                    if (Game.time % 2 == 0 && creep.pos.getRangeTo(hostiles[0] < 4)) {
                        creep.rangedAttack(hostiles[0]);
                    }
                    else {
                        creep.rangedMassAttack(hostiles[0]);
                    }
                    creep.moveTo(hostiles[0], { maxRooms: 1, ignoreCreeps: true });
                }
                else {

                    if (Game.time % 2 == 0 && creep.pos.getRangeTo(hostiles[0] < 4)) {
                        creep.rangedAttack(hostiles[0]);
                    }
                    else {
                        creep.rangedMassAttack(hostiles[0]);
                    }
                }
            }
            else if (_.some(target, t => t.structureType == STRUCTURE_SPAWN))
            {
                target = _.find(target, function (e) {
                    return e.structureType == STRUCTURE_SPAWN
                });
            }
            else if (_.some(target, t => t.structureType == STRUCTURE_TOWER))
            {
                target = _.find(target, function (e) {
                    return e.structureType == STRUCTURE_TOWER
                });
                if ( creep.attack(target[0]) == ERR_NOT_IN_RANGE) creep.moveTo(target[0]);

                //console.log('Hostile Buildings: ' + target);
            }
        else
            {
                creep.moveTo(25,25);
            }

        }


        if (hostiles.length == 0 && target.length == 0 && creep.room.name == creep.memory.targetRoom) {
            //creep.memory.targetRoom = invasionRoom;
        }

        if (creep.moveTo(target[0]) == ERR_NO_PATH) {
            var wallRamps = creep.room.find(FIND_STRUCTURES, (s) => s.structureType == (STRUCTURE_RAMPART || STRUCTURE_WALL));
            wallRamps.sort(function (a, b) {
                return a.hits - b.hits;
            });
            if (creep.attack(creep.pos.findClosestByRange(wallRamps)) == ERR_NOT_IN_RANGE) creep.moveTo(creep.pos.findClosestByRange(wallRamps));
        }
        //console.log(creep.room.name + ':' + ' ' + creep.name + '-Hostiles: ' + hostiles );
        //console.log('Structures: ' + target);
    }
};

module.exports = roleInvader;