var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name != creep.memory.home) {
            /*if (creep.memory.waypoint == false) {

             creep.moveTo(Game.flags.Flag1, {reusePath: 15});
             }
             else if (creep.memory.waypoint == true) {
             creep.moveTo(Game.flags.Flag69, {reusePath: 15});
             }
             //console.log('one')
             if (creep.pos.getRangeTo(Game.flags.Flag1) < 6) {
             creep.memory.waypoint = true;
             }*/
            creep.moveTo(creep.memory.home);
        }
        else {
            if (creep.memory.filling && _.sum(creep.carry) == 0) {
                creep.memory.filling = false;
                creep.say('harvesting');
            }
            if (!creep.memory.filling && (_.sum(creep.carry) == creep.carryCapacity || _.sum(creep.carry) > 800)) {
                creep.memory.filling = true;
                creep.say('Transfering');
            }
            if (!creep.memory.filling && _.sum(creep.carry) < creep.carryCapacity) {
                var spawnNames = creep.room.find(FIND_MY_SPAWNS);
                var dropMiners = _.sum(Game.creeps, (c) => c.memory.role == 'dropMiner' && c.memory.home == creep.room.name
            )
                ;
                var sources = creep.room.find(FIND_SOURCES);

                sources.sort(function (a, b) {
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                });
                var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);

                if (_.sum(creep.carry) == creep.carryCapacity && creep.carry.energy < creep.carryCapacity) {
                    for (carriedResource in creep.carry) {
                        if (creep.transfer(creep.room.storage, carriedResource) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, {maxRooms: 1});
                        }
                    }
                }
                else {
                    
                    //console.log('DP: ' + droppedEnergy);
                    creep.memory.target = undefined;
                    if (creep.pos.getRangeTo(droppedEnergy < 2)) {
                        creep.pickup(droppedEnergy);
                    }
                    else if (creep.pos.getRangeTo(droppedEnergy) > 1 && droppedEnergy.amount > 20) creep.moveTo(droppedEnergy);
                    else {
                        if (droppedEnergy == null || droppedEnergy.energy < 150) {
                            var tanks = creep.room.find(FIND_STRUCTURES, {
                                            filter: (structure) => {
                                            return ((structure.structureType == STRUCTURE_CONTAINER) &&
                                        (structure.store[RESOURCE_ENERGY] > (.35 * creep.carryCapacity)));
                            }
                            })
                                ;
                            if (tanks.length == 0) {
                                tanks = creep.room.find(FIND_STRUCTURES, {
                                            filter: (structure) => {
                                            return structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > (creep.carryCapacity * .5);
                            }
                            })
                                ;
                            }
                            if (tanks.length == 0) {
                                tanks = creep.room.find(FIND_STRUCTURES, {
                                            filter: (structure) => {
                                            return structure.structureType == STRUCTURE_TERMINAL && structure.store[RESOURCE_ENERGY] > (creep.carryCapacity * .5);
                            }
                            })
                                ;
                            }                            
                            if (sources.energy == 0 || dropMiners > (sources.length - 1) || tanks.length) {
                                creep.pickup(droppedEnergy);
                                tanks.sort(function (a, b) {
                                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                                });
                                //console.log(creep.name + ' Tanks!!! ' + tanks)
                                if (creep.withdraw(tanks[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(tanks[0], {maxRooms: 1});
                                }
                            }
                            else {
                                if (creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(sources[0], {maxRooms: 1});
                                }
                            }
                        }
                        else {
                            if (creep.pos.getRangeTo(droppedEnergy) < 35) {
                                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(droppedEnergy, {maxRooms: 1});
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (creep.memory.target != undefined) {
                    var targetCheck = Game.getObjectById(creep.memory.target.id);
                    if (targetCheck.energy == targetCheck.energyCapacity) creep.memory.target = undefined;
                }
                if ((creep.memory.target == undefined)) {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                            return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        (structure.energy < structure.energyCapacity));
                }});
                    
                    if (targets.length == 0) {
                        targets = creep.room.find(FIND_MY_STRUCTURES, {
                                    filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_TOWER) && (structure.energy < (.8 * structure.energyCapacity));
                    }
                    })
                    }
                    ;
                    if (targets.length == 0) {
                        targets = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                return ((structure.structureType == STRUCTURE_NUKER || structure.structureType == STRUCTURE_LAB || structure.structureType == STRUCTURE_POWER_SPAWN) && (structure.energy < structure.energyCapacity));
                    }
                    })
                        ;
                    }
                    if (targets.length == 0) {
                        targets = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                return (structure.structureType == (STRUCTURE_STORAGE || STRUCTURE_TERMINAL) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity));
                    }
                    })
                        ;
                    }
                    //console.log("test1" + targets[0]);
                    targets.sort(function (a, b) {
                        return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                    })

                    creep.memory.target = targets[0];
                }
                ;
                //console.log(creep.name + 'c  final ' + targets[0]);

                if (creep.memory.target != undefined && creep.carry.energy > 0) {
                    if (creep.transfer(Game.getObjectById(creep.memory.target.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.target.id, {maxRooms: 1}));
                    }
                }
                else if (_.sum(creep.carry) > 0 && creep.carry.energy < creep.carryCapacity) {
                    for (carriedResource in creep.carry) {
                        if (creep.transfer(creep.room.storage, carriedResource) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, {maxRooms: 1});
                        }
                    }
                }
            }
        }
    }
}
    
function priority(target) {

   if(target instanceof StructureSpawn) return 1;

   else if(target instanceof StructureExtension) return 1;

   else if(target instanceof StructureTower) return 2;

   else return 3;

}
   
module.exports = roleHarvester;