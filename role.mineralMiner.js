var rolemineralMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var mineralNode = creep.room.find(FIND_MINERALS);
        Game.rooms[creep.room.name].memory.mineralID = mineralNode[0].id;
        var hostileCreepers = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function(c) {
                return c.owner.username != 'deft-code' && creep.pos.getRangeTo(c) < 11;
            }
        });
            if ((creep.memory.filling && _.sum(creep.carry) == 0) || (creep.memory.filling && mineralNode[0].mineralAmount > 0 && _.sum(creep.carry) < creep.carryCapacity * .5)) {
                creep.memory.filling = false;
                creep.say('harvesting');
            }
            ;
            if (!creep.memory.filling && _.sum(creep.carry) == creep.carryCapacity)  {
                creep.memory.filling = true;
                creep.say('Transfering');
            }
            ;     
            if (creep.room.name == creep.memory.targetRoom && mineralNode.mineralAmount == 0) {
                creep.memory.filling = true;
                creep.say('Transfering');
            }
        
        var spawnNames = creep.room.find(FIND_MY_SPAWNS);
        if(creep.ticksToLive < 800) {
            creep.memory.needsRepair = true;
        };
        if(creep.ticksToLive > 1400) {
            creep.memory.needsRepair = false;
        };
        
        var damagedRoads = creep.room.find(FIND_STRUCTURES, {
                filter: function (r) {
                    return (r.hits < r.hitsMax && (r.structureType == STRUCTURE_ROAD) && creep.pos.getRangeTo(r) < 2) || ((r.hits < r.hitsMax  * .5) && (r.structureType == STRUCTURE_ROAD));
                }
            });
        var conSites = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: function (c) {
                return creep.pos.getRangeTo(c) < 5;
            }
        });
        
        var localSpawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
        if (Game.rooms[creep.memory.targetRoom]) var sources = Game.getObjectById(Game.rooms[creep.memory.targetRoom].memory.mineralID);
        if (creep.memory.filling && creep.carry.energy > 0 && mineralNode[0].mineralAmount > 0 && (conSites.length || damagedRoads.length)) {
            
                
            
            
            
            if (damagedRoads.length && creep.carry.energy > 0 && creep.getActiveBodyparts(WORK)) {
                if (creep.repair(damagedRoads[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(damagedRoads[0], { maxRooms: 1});
                }
                //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 2: " + (Game.cpu.getUsed() - beginCPU));
            }
            else if (conSites.length && creep.carry.energy > 0 && creep.getActiveBodyparts(WORK)) {
                if (creep.build(conSites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(conSites[0], { maxRooms: 1});
                }
                //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 4: " + (Game.cpu.getUsed() - beginCPU));
            }
            
        }
        else if(localSpawn && !localSpawn.spawning && creep.memory.needsRepair == true && creep.pos.getRangeTo(localSpawn) < 10 && creep.room.energyAvailable > 8000) {
            if (localSpawn.renewCreep(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(localSpawn);
            }
        }
        else if(creep.room.name != creep.memory.home &&  hostileCreepers.length > 0) {
            var exit = creep.room.findExitTo(creep.memory.home);
            creep.moveTo(creep.pos.findClosestByPath(exit), {maxRooms: 1});
        }
        else if (Game.rooms[creep.memory.targetRoom] && Game.getObjectById(Game.rooms[creep.memory.targetRoom].memory.mineralID).mineralAmount == 0) {
            creep.memory.filling = true;
            if (creep.memory.home != creep.room.name){
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByPath(exit), {maxRooms: 1});
            }
            else {
                if (_.sum(creep.carry) > 0) {
                    for (var resourceType in creep.carry) {
                        if (creep.transfer(creep.room.terminal, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal, { maxRooms: 1});
                        }
                    }
                }
                else {
                    if (Game.spawns[spawnNames[0].name].recycleCreep(creep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.spawns[spawnNames[0].name], { maxRooms: 1});
                    }
                }
            }
        }
        else if (!creep.memory.filling && _.sum(creep.carry) < creep.carryCapacity) {
            if (creep.room.name != creep.memory.targetRoom) {
                var exit = creep.room.findExitTo(creep.memory.targetRoom);
                creep.moveTo(creep.pos.findClosestByPath(exit), {maxRooms: 1});
            }
            else {
                var droppedResources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if (creep.pos.getRangeTo(droppedResources) < 3) {
                    if (creep.pickup(droppedResources) == ERR_NOT_IN_RANGE) creep.moveTo(droppedResources);
                }
                if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, { maxRooms: 1});
                }
            }

        }
        else {
             if (creep.room.name != creep.memory.home) {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByPath(exit), {maxRooms: 1});
            }
            else {
                if (creep.room.terminal &&  _.sum(creep.room.terminal.store) < 295000) {
                    for(var resourceType in creep.carry) {
                        if (creep.transfer(creep.room.terminal, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal, { maxRooms: 1});
                        }
                    }
                }
                else if (creep.room.storage && _.sum(creep.room.storage.store) < 1000000) {
                    for(var resourceType in creep.carry) {
                        if (creep.transfer(creep.room.storage, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, { maxRooms: 1});
                        }
                    }
                }
            }
        }
    }

};
    
function priority(target) {

   if(target instanceof StructureSpawn) return 1;

   else if(target instanceof StructureExtension) return 1;

   else if(target instanceof StructureTower) return 2;

   else return 3;

}
   
module.exports = rolemineralMiner;