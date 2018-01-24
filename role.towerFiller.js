var roleTowerFiller = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.filling && creep.carry.energy == 0) {
            creep.memory.filling = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.filling && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.filling = true;
	        creep.say('Transfering');
	    }
	    var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES , {
            filter: function (e) {
                return e.energy > 25;
            }
        });
		if(creep.room.name != creep.memory.home) {
            var exit = creep.room.findExitTo(creep.memory.home);
            creep.moveTo(creep.pos.findClosestByPath(exit), {reusePath: 15, maxRooms: 1});

            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 1: " + (Game.cpu.getUsed() - beginCPU));
        }
		else if(!creep.memory.filling && creep.carry.energy < creep.carryCapacity) {
            var spawnNames = creep.room.find(FIND_MY_SPAWNS);
            var sources = creep.room.find(FIND_SOURCES);
            if (droppedEnergy && creep.pos.getRangeTo(droppedEnergy) < 20 && creep.carry.energy < creep.carryCapacity) {
                if(creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy, { maxRooms: 1});
                }
            }
            else if(sources.energy == undefined || (_.sum(Game.creeps, (c) => c.memory.role == 'dropMiner' && c.memory.home == creep.memory.home > 0))) {
                var tanks = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_TERMINAL|| structure.structureType == STRUCTURE_CONTAINER) &&
                        (structure.store[RESOURCE_ENERGY] > 75)) || (structure.structureType == STRUCTURE_LINK && structure.energy > 0);
                    }
                });
                tanks.sort(function(a,b) {
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
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            (structure.energy < structure.energyCapacity);
                    }
            });
            targets.sort(function(a,b) {
                return a.energy - b.energy;
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { maxRooms: 1});
                }
            }
        }
	}
};

module.exports = roleTowerFiller;