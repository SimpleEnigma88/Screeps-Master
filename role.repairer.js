var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        function priority(target) {

            if(target instanceof StructureContainer) return 1;

            else if(target instanceof StructureRampart) return 2;

            else if(target instanceof StructureWall) return 2;

            else return 3;

        };
        if (Game.time % 50 == 0) creep.memory.target = undefined;

        var hostileCreepers = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function (c) {
                return c.owner.username != ('deft-code' || 'Source Keeper') && creep.pos.getRangeTo(c) < 10;}});
        var targets = [];
        var conSites = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: function (c) {
                return creep.pos.getRangeTo(c) < 5 || c.structureType == STRUCTURE_RAMPART;
            }
        });
        conSites.sort(function (a, b) {
                        return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                    });
        if (creep.repair(conSites[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(conSites[0], { maxRooms: 1});
                    }
        if (creep.memory.repairing == undefined) creep.memory.repairing = true;
	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvesting');
            creep.memory.target = undefined;
	    }
	    if(!creep.memory.repairing && _.sum(creep.carry) == creep.carryCapacity && creep.carry.energy > 0) {
	        creep.memory.repairing = true;
	        creep.say('repairing');
	    }
	    if (creep.room.name != creep.memory.home) {
            var exit = creep.room.findExitTo(creep.memory.home);
            creep.moveTo(creep.pos.findClosestByRange(exit), {reusePath: 15});
        }
        else if (hostileCreepers.length > 0) {
            creep.moveTo(25,25);
        }
        else if(creep.memory.repairing && conSites.length) {
            if (creep.build(conSites[0]) == ERR_NOT_IN_RANGE) creep.moveTo(conSites[0]);
            creep.memory.target = undefined;
        }
	    else if(creep.memory.repairing) {
            if (creep.room.name != creep.memory.home) {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit), {reusePath: 15});
            }
            else {
                if (((creep.memory.target == undefined || creep.memory.target == null) && creep.memory.home == creep.room.name)) {
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: function (object) {
                            return object.hits < (object.hitsMax * .95) && object.structureType == STRUCTURE_CONTAINER;
                        }
                    });
                    //console.log(creep.room.name + '-TEST 1: ' + targets[0])
                }
                if ((creep.memory.target == undefined || creep.memory.target == null) && targets[0] == undefined) {
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: function (object) {
                            return (object.hits < object.hitsMax * .95)/* && object.structureType == STRUCTURE_CONTAINER && (object.structureType != STRUCTURE_ROAD)*/;
                        }
                    });
                    targets.sort(function (a, b) {
                        return a.hits - b.hits;
                    });
                    //console.log(creep.room.name + '-TEST 2: ' + targets[0])
                }
                //console.log('CPU Check 10: ' + Game.cpu.getUsed());
                while (creep.memory.target == undefined && targets.length) {
                    //console.log('CPU Check 20: (' + creep.name + ') ' + Game.cpu.getUsed());
                    var repairers = creep.room.find(FIND_MY_CREEPS, {
                            filter: (c) => {
                            return c.memory.role == 'repairer'
                        }
                });
                    if (!(_.some(repairers, (c) => c.memory.target == targets[0]))) {
                        creep.memory.target = targets[0];
                    }

                    targets.splice(0,1);
                    //console.log(targets.length);
                    //console.log(targets[0]);
                }
                if (creep.memory.target != undefined) {
                    if (creep.repair(Game.getObjectById(creep.memory.target.id)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.target.id), { maxRooms: 1});
                    }
                }
                if ( creep.memory.target != null && creep.memory.target != undefined) {
                    //console.log(Game.getObjectById(creep.memory.target.id).hits + '==' + Game.getObjectById(creep.memory.target.id).hitsMax);
                    if (creep.memory.target && Game.getObjectById(creep.memory.target.id).hits == Game.getObjectById(creep.memory.target.id).hitsMax) {
                        creep.memory.target = undefined;
                    }
                }
            }
            //if(creep.memory.target != undefined) console.log(creep.room.name + ' ' + creep.memory.target.structureType);
        }
		else if(!creep.memory.repairing && creep.carry.energy < creep.carryCapacity) {
		    if (creep.room.storage) var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                if (!creep.room.storage) var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES , {
                                filter: (resource) => {
                                return (resource.resourceType == RESOURCE_ENERGY) && resource.energy > 50;
                }
                })
                    ;
            if (_.sum(creep.carry) > 0 && creep.carry.energy == 0) {
                for (carriedResource in creep.carry) {
                    if (creep.transfer(creep.room.storage, carriedResource) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, { maxRooms: 1});
                    }
                }
            }
            else {
                if (droppedEnergy == null) {
                    var spawnNames = creep.room.find(FIND_MY_SPAWNS);
                    var sources = creep.pos.findClosestByRange(FIND_SOURCES);
                    var dropMiners = _.sum(Game.creeps, (c) => c.memory.role == 'dropMiner' && c.memory.home == creep.room.name
                )
                    ;
                    if (sources.energy == 0 || dropMiners > 0) {
                        var tanks = creep.room.find(FIND_STRUCTURES, {
                                    filter: (structure) => {
                                    return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_TERMINAL) &&
                            (structure.store[RESOURCE_ENERGY] > 100)) || (structure.structureType == STRUCTURE_LINK && structure.energy > 0);
                    }
                    })
                        ;
                        tanks.sort(function (a, b) {
                            return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                        });
                        if (creep.withdraw(tanks[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(tanks[0], { maxRooms: 1});
                        }
                    }
                    else {
                        if (creep.harvest(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources, { maxRooms: 1});
                        }
                    }
                }
                else {
                    if (creep.pos.getRangeTo(droppedEnergy) < 50) {
                        if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(droppedEnergy, { maxRooms: 1});
                        }
                    }
                }
                //if (creep.pos.getRangeTo(creep.room.controller) < 5) creep.upgradeController(creep.room.controller);
            }
        }
	}
};


module.exports = roleRepairer;