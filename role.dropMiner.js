var roledropMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
     /*const target = creep.pos.findClosestByRange(FIND_STRUCTURES,
    {filter: {structureType: STRUCTURE_WALL}});
if(target) {
    if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(11,1);
    }
}*/
        if (creep.ticksToLive % 27 == 0) creep.memory.sourceID = undefined;
        if (creep.memory.sourceID == undefined && creep.memory.home == creep.room.name) {
            //console.log('test 1');
            var spawnNames = creep.room.find(FIND_MY_SPAWNS);
            var sources = creep.room.find(FIND_SOURCES);
            var containers = [];
            containers = creep.room.find(FIND_STRUCTURES, {
                filter: function (r) {
                    return r.structureType == STRUCTURE_CONTAINER && creep.pos.getRangeTo(r) < 3;
                }
            });
            if (sources.length > 1) {
                //console.log('test 2');
                var dropCreeps = creep.room.find(FIND_MY_CREEPS, {
                    filter: function (c) {
                        return c.memory.role == 'dropMiner';
                    }
                });
                for (i in sources) {
                    if (_.some(dropCreeps, c => c.memory.sourceID == sources[i].id))
                    {
                        //console.log('test 3');
                        continue;
                    }
                else
                    {
                        creep.memory.sourceID = sources[i].id;
                        //console.log('test 4')
                    }
                };
            }
            else {
                creep.memory.sourceID = sources[0].id;
                //console.log('test 5');
            }
        }
        
        var containers = [];
        var source = Game.getObjectById(creep.memory.sourceID);
        if (source != undefined) {
            containers = creep.room.find(FIND_STRUCTURES, {
                filter: function (r) {
                    return r.structureType == STRUCTURE_CONTAINER && creep.pos.getRangeTo(r) < 3 && _.sum(r.store) < r.storeCapacity && source.pos.getRangeTo(r) < 2;
                }
            });
            containers.sort(function(a,b) {
                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
            })
        }
        if (creep.pos.getRangeTo(containers[0]) > 0 && source.pos.getRangeTo(containers[0]) < 2) {
            creep.moveTo(containers[0]);
        }
        else if (creep.harvest(Game.getObjectById(creep.memory.sourceID), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.sourceID));
        }
    }
};

module.exports = roledropMiner;