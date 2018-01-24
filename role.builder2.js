var roleBuilder2 = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.carry.energy == 0 && creep.room.name != creep.memory.targetRoom  && creep.getActiveBodyparts(CARRY) > 0) {
            if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage);
            }
        }
        else if(creep.room.name != creep.memory.targetRoom) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit), {maxRooms: 1});
        }
        else if ( !creep.room.controller.my && creep.getActiveBodyparts(CLAIM) > 0) {
            if (creep.claimController(Game.getObjectById('5982fce7b097071b4adbe597')) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var upgraders = creep.room.find(FIND_MY_CREEPS, {
                    filter: (c) => {
                    return c.memory.role == 'upgrader'
                }
        });
            var dropminers = creep.room.find(FIND_MY_CREEPS, {
                        filter: (c) => {
                        return c.memory.role == 'dropMiner'
                    }
            });
            var repairers = creep.room.find(FIND_MY_CREEPS, {
                    filter: (c) => {
                    return c.memory.role == 'repairer'
                }
        });
            var builders = creep.room.find(FIND_MY_CREEPS, {
                    filter: (c) => {
                    return c.memory.role == 'builder'
                }
        });
            if (dropminers.length < 2 && creep.getActiveBodyparts(WORK) > 0) {
                creep.memory.role = 'dropMiner';
                creep.memory.upgrading = false;
                creep.memory.home = creep.room.name;
            }
            else if ( builders.length < 8 && creep.getActiveBodyparts(WORK) > 0) {
                creep.memory.building = true;
                creep.memory.home = creep.room.name;
                creep.memory.role = 'builder';
            }
            else if (upgraders.length < 3 && creep.getActiveBodyparts(WORK) > 0) {
                creep.memory.role = 'upgrader';
                creep.memory.upgrading = false;
                creep.memory.home = creep.room.name;
            }
            else {
                if (builders.length > 3) {
                    creep.memory.recycle = true;
                }
                creep.memory.building = true;
                creep.memory.home = creep.room.name;
                creep.memory.role = 'builder';
            }
        }

/*
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) =>  s.structureType == STRUCTURE_WALL && s.hits < 150000
        });
        console.log(target);
            if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);

        }*/

    }
};

module.exports = roleBuilder2;