var roleAttacker = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var spawnNames = creep.room.find(FIND_MY_SPAWNS);
        var hostiles = [];
        if (creep.memory.targetRoom == creep.room.name) {
            hostiles = creep.room.find(FIND_HOSTILE_CREEPS, {
                filter: function (c) {
                    return c.owner.username != 'deft-code'
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
        if (creep.memory.engaged == 'bob' && creep.ticksToLive < 1425 && creep.room.name == creep.memory.home) {
            var spawners = creep.room.find(FIND_MY_SPAWNS);
            if (spawners[0].recycleCreep(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById('598e5ff0e2c52e38802e4ae2'));
            }
        }
        else if (creep.room.name != creep.memory.targetRoom) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else {
            if (hostiles.length == 0) {
                creep.memory.engaged = false;
            }
            var targets = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function (creep) {
                    return creep.hits < creep.hitsMax;
                }
            });
            if (targets && creep.pos.getRangeTo(targets) < 5) {
                if (creep.heal(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, { maxRooms: 1, ignoreCreeps: true });
                    creep.rangedHeal(targets);
                    //console.log('DamagedCreeps: ' + targets);
                }
            }
            else if(creep.hits < creep.hitsMax) {
                creep.heal(creep);
            }
            else {
                if(creep.room.name != creep.memory.home) {
                    var exit = creep.room.findExitTo(creep.memory.home);
                    creep.moveTo(creep.pos.findClosestByRange(exit));
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
            else if (_.some(target, t => t.structureType == STRUCTURE_TOWER))
            {
                target = _.find(target, function (e) {
                    return e.structureType == STRUCTURE_TOWER
                })

                //console.log('Hostile Buildings: ' + target);
            }
        else
            {
                creep.moveTo(20,25);
            }
        if (((creep.pos.x == 0 || creep.pos.x == 49) || (creep.pos.y == 0 || creep.pos.x ==49)) && creep.room.name == creep.memory.targetRoom) creep.moveTo(25,25);

        }
        if (hostiles.length == 0 && creep.room.name == creep.memory.targetRoom) {
            creep.memory.targetRoom = creep.memory.home;
        }

        //console.log(creep.room.name + ':' + ' ' + creep.name + '-Hostiles: ' + hostiles );
        //console.log('Structures: ' + target);
        if (((creep.pos.x == 0 || creep.pos.x == 49) || (creep.pos.y == 0 || creep.pos.x ==49)) && creep.room.name == creep.memory.targetRoom) creep.moveTo(25,25);
    }
};

module.exports = roleAttacker;