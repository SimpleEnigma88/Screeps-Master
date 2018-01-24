var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.upgrading == undefined) creep.memory.upgrading = true;
        if (Game.time % 8 == 0) creep.memory.tanks = undefined;
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
            creep.memory.tanks = undefined;
	    }
	    if(!creep.memory.upgrading && _.sum(creep.carry) >= creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }
	    if (creep.memory.target != undefined) {
            var targetCheck = Game.getObjectById(creep.memory.tanks.id);
            if ((targetCheck.energy == 0) || (targetCheck.store[RESOURCE_ENERGY] == 0) || (Game.time % 8 == 0)) {
                creep.memory.tanks = undefined;
            }
        }
        if(creep.memory.tanks == undefined) {

            var tanks = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                            return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_TERMINAL) &&
                        (structure.store[RESOURCE_ENERGY] > 100)) || ((structure.structureType == STRUCTURE_LINK) && (structure.energy > 0));
            }
            })
                ;
            if (!tanks.length) {
                tanks = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                            return ((structure.structureType == STRUCTURE_CONTAINER) &&
                        (structure.store[RESOURCE_ENERGY] > 100)) || ((structure.structureType == STRUCTURE_LINK) && (structure.energy > 0));
                    }});
            }
            

            tanks.sort(function (a, b) {
                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
            });
            creep.memory.tanks = tanks[0]
        }
        var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES , {
                                filter: (resource) => {
                                return (resource.resourceType == RESOURCE_ENERGY) && resource.energy > 50;
                }
                })
                    ;
	    if(creep.memory.upgrading) {
            if ( creep.room.name != creep.memory.home) {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
            else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {maxRooms: 1});
            }
            if (creep.memory.tanks != undefined) {
                creep.withdraw(Game.getObjectById(creep.memory.tanks.id), RESOURCE_ENERGY);
                var targetCheck = Game.getObjectById(creep.memory.tanks.id);
                if (targetCheck.structureType == (STRUCTURE_TERMINAL || STRUCTURE_CONTAINER)) {
                    if (targetCheck.store[RESOURCE_ENERGY] == 0) {
                        creep.memory.tanks = undefined;
                    }
                }
                else if ( targetCheck.energy == 0) creep.memory.tanks = undefined;
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES , {
                                filter: (resource) => {
                                return (resource.resourceType == RESOURCE_ENERGY) && resource.energy > 50;
                }
                })
                    ;
            //console.log( creep.name + droppedEnergy);
            if (creep.pos.getRangeTo(droppedEnergy) < 35 && droppedEnergy.amount > 30) {
                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy, {maxRooms: 1});
                }
            }
            else if ((_.sum(Game.creeps, (c) => c.memory.role == 'dropMiner' && c.room.name == creep.room.name)) > 0) {


                if(creep.memory.tanks != undefined) {
                    if (creep.withdraw(Game.getObjectById(creep.memory.tanks.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.tanks.id));
                    }
                }
                //console.log(creep.name + ' 12')
            }
            else if(creep.memory.tanks != undefined) {
                if (creep.pos.getRangeTo(Game.getObjectById(creep.memory.tanks.id)) < 6) {
                    if (creep.withdraw(Game.getObjectById(creep.memory.tanks.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.tanks.id));
                    }

                    if (creep.memory.tanks.hasOwnProperty(creep.memory.tanks.energy)) {
                        if(creep.memory.tanks.energy == 0) creep.memory.tanks = undefined;
                    }
                    if (creep.memory.tanks.hasOwnProperty(creep.memory.tanks.store)) {
                        if (creep.memory.tanks.store[RESOURCE_ENERGY] == 0) creep.memory.tanks = undefined;
                    }}
                else if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
                //console.log(creep.name + ' 13')
            }
            else {
                if (creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {maxRooms: 1});
                }
            }
        }
    }
};


module.exports = roleUpgrader;