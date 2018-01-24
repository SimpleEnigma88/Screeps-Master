var roleBuilder = {
//hello
    /** @param {Creep} creep **/
    run: function(creep) {
        /*var target = creep.pos.findClosestByRange(FIND_STRUCTURES,
    {filter: {structureType: STRUCTURE_WALL}});
        if(target) {
            if(creep.room.name == 'W27N16' && creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }*/
        if (creep.memory.building == undefined) {
            creep.memory.building = true;
            creep.memory.targetRoom = creep.room.name;
        }
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(creep.room.name != creep.memory.targetRoom) {
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
            creep.moveTo(creep.memory.targetRoom, {ignoreCreep: true, maxRooms: 1});
        }
        else {
            if (creep.room.name == creep.memory.targetRoom) {

                var spawns = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
                //console.log(creep.room.name + ' ' + creep.name);
                //console.log(spawns);
                var tanks = creep.room.find(FIND_STRUCTURES, {
                    filter: function (r) {
                        return r.structureType == STRUCTURE_CONTAINER && _.sum(r.store) < r.storeCapacity;
                    }
                });
                tanks.sort(function (a, b) {
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                })
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                targets.sort(function (a,b) {
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                })
            }

            if (creep.memory.building && creep.getActiveBodyparts(WORK) > 0) {
                if (targets.length) {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {maxRooms: 1});
                    }
                }
            }

            if ((creep.memory.recycle == true || !targets.length || creep.getActiveBodyparts(WORK) == 0) && creep.room.name == creep.memory.home) {
                var spawners = creep.room.find(FIND_MY_SPAWNS);
                if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.carry.energy > 0) {
                    if (creep.carry.energy > 0) {
                        creep.moveTo(creep.room.storage, {maxRooms: 1});
                    }
                }
                else if (spawners[0].recycleCreep(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawners[0]);
                }
                else if (spawners[0].recycleCreep(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawners[0]);
                }
            }
            else {
                //console.log('two')
                if (!creep.memory.building && creep.carry.energy < creep.carryCapacity) {
                    var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES , {
                                filter: (resource) => {
                                return (resource.resourceType == RESOURCE_ENERGY) && resource.energy > 50 && creep.pos.getRangeTo(resource) < 15;
                }
                })
                    ;
                    if (droppedEnergy == null/* || creep.pos.getRangeTo(droppedEnergy) > 5*/) {
                        var sources = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                        var dropMiners = _.sum(Game.creeps, (c) => c.memory.role == 'dropMiner' && c.memory.home == creep.room.name
                    )
                        ;
                        var tanks = creep.room.find(FIND_STRUCTURES, {
                                    filter: (structure) => {
                                    return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_TERMINAL) &&
                            (structure.store[RESOURCE_ENERGY] > ((creep.carryCapacity - _.sum(creep.carry)) * .5))) || (structure.structureType == STRUCTURE_LINK && structure.energy > 0);
                    }
                    })
                        ;
                        if (tanks.length) {
                            tanks.sort(function (a, b) {
                                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                            });
                            if (creep.withdraw(tanks[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(tanks[0], {reusePath: 5});
                            }
                            creep.build(targets[0]);
                        }
                        else {
                            if (creep.harvest(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(sources, {reusePath: 5});
                            }
                            creep.build(targets[0]);
                        }
                    }
                    else {
                        if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(droppedEnergy, {reusePath: 5, maxRooms: 1});
                        }
                        creep.build(targets[0]);
                    }
                }
            }
        }
    }
};

module.exports = roleBuilder;
