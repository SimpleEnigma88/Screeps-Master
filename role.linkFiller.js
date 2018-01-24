var rolelinkFiller = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (Game.time % 1 == 0) {
            if (creep.memory.filling && creep.carry.energy >= (creep.carryCapacity * .5)) {
                creep.memory.filling = false;
            }
            if (!creep.memory.filling && creep.carry.energy == 0) {
                creep.memory.filling = true;
            }
            /*if (creep.room.storage.store[RESOURCE_ENERGY] > 990000 && creep.room.name != 'W38N76') {
                creep.memory.mode = 'upgradeController';
            }
            if (creep.room.storage.store[RESOURCE_ENERGY] < 1000000 && creep.room.name != 'W33N76') {
                creep.memory.mode = 'conserve';
            }*/
            if (creep.memory.mode == 'upgradeController') {
                if (creep.memory.filling && creep.carry.energy < creep.carryCapacity) {
                    //var spawnNames = creep.room.find(FIND_MY_SPAWNS);
                    //var sources = Game.spawns[spawnNames[0].name].pos.findClosestByRange(FIND_SOURCES);
                    //if(sources.energy == 0) {
                    var tanks = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_TERMINAL) &&
                        (structure.store[RESOURCE_ENERGY] > 100);
                }
                })
                    ;
                    tanks.sort(function (a, b) {
                        return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                    });
                    //console.log( creep.name + ' : ' + sumTanks);

                    if (creep.withdraw(tanks[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tanks[0], { maxRooms: 1});
                    }

                }
                //else {
                //if (creep.harvest(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources);
                //}
                //}
                //}
                else {
                    var targets = creep.pos.findInRange(FIND_STRUCTURES, 50, {
                                filter: (structure) => {
                                return (structure.structureType == STRUCTURE_LINK) &&
                        (structure.energy <= structure.energyCapacity);
                }
                })
                    ;

                    //console.log('LINKS: ' + targets)
                    if (targets.length > 0) {
                        if (creep.transfer(Game.getObjectById(creep.memory.targetLink), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.getObjectById(creep.memory.targetLink), { maxRooms: 1});
                        }
                        if (creep.transfer(Game.getObjectById(creep.memory.targetLink2), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.getObjectById(creep.memory.targetLink2), { maxRooms: 1});
                        }
                        if (creep.transfer(Game.getObjectById(creep.memory.targetLink3), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.getObjectById(creep.memory.targetLink3), { maxRooms: 1});
                        }
                    }
                    else {
                        var ExtSpawns = creep.room.find( FIND_MY_STRUCTURES, {
                            filter: function (s) {
                                return (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) && s.energy < s.energyCapacity;
                            }
                        });
                        ExtSpawns.sort(function (a, b) {
                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
            });
                        if (creep.transfer(ExtSpawns[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(ExtSpawns[0], { maxRooms: 1});
                        }
                    }
                }
            }
            else if (creep.memory.mode == 'conserve') {
                if (creep.memory.filling && creep.carry.energy < creep.carryCapacity) {
                    if (creep.withdraw(Game.getObjectById(creep.memory.targetLink), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.targetLink), { maxRooms: 1});
                    }
                    if (creep.withdraw(Game.getObjectById(creep.memory.targetLink2), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.targetLink2), { maxRooms: 1});
                    }
                    if (creep.withdraw(Game.getObjectById(creep.memory.targetLink3), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.targetLink3), { maxRooms: 1});
                    }
                }
                else {
                    /*var tanks = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                return (structure.structureType == STRUCTURE_STORAGE) &&
                        (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                }
                })
                    ;*/
                    if (creep.room.storage.store[RESOURCE_ENERGY] > 500000 && _.sum(creep.room.terminal.store) < 270000) {
                        if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal, { maxRooms: 1});
                            
                        }
                    }
                    else {
                        if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, { maxRooms: 1});
                            
                        }
                    }
                }
            }
        }
    }
};

module.exports = rolelinkFiller;