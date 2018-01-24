var roleSKremoteMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var beginCPU = Game.cpu.getUsed();
        ////if((Game.cpu.getUsed() - beginCPU) > 2) console.log('Available AttackeRs: ' + availableAttackers);
        var room = Game.rooms[creep.room.name];
        ////if((Game.cpu.getUsed() - beginCPU) > 5) console.log(creep.name + "Test 0-1a: " + (Game.cpu.getUsed() - beginCPU));
        
        
        var spawnNames = Game.rooms[creep.memory.home].find(FIND_MY_SPAWNS);
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        var damagedRoads = [];
        damagedRoads = creep.room.find(FIND_STRUCTURES, {
            filter: function (r) {
                return r.hits < r.hitsMax && (r.structureType == STRUCTURE_ROAD) && creep.pos.getRangeTo(r) < 2;
            }
        });
        var conSites = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: function (c) {
                return creep.pos.getRangeTo(c) < 5;
            }
        });

        //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + ' - Tanks:: ' + tanks);
        /*
         if(creep.ticksToLive < 500) {
         creep.memory.needsRepair = true;
         };
         if(creep.ticksToLive > 1400) {
         creep.memory.needsRepair = false;
         };
         var localSpawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
         if(creep.memory.needsRepair == true && creep.pos.getRangeTo(localSpawn) < 7 && creep.room.name == creep.memory.home) {
         if (localSpawn.renewCreep(creep) == ERR_NOT_IN_RANGE) {
         creep.moveTo(localSpawn);
         }
         }*/
        if(creep.room.name != creep.memory.home) {
            var exit = creep.room.findExitTo(creep.memory.home);
            creep.moveTo(creep.pos.findClosestByPath(exit), {reusePath: 15, maxRooms: 1});

            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 1: " + (Game.cpu.getUsed() - beginCPU));
        }
        else if (damagedRoads.length && (creep.carry.energy >= (creep.carryCapacity * .85)) && creep.getActiveBodyparts(WORK)) {
            if (creep.repair(damagedRoads[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(damagedRoads[0], { maxRooms: 1});
            }
            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 2: " + (Game.cpu.getUsed() - beginCPU));
        }
        else if (conSites.length && (creep.carry.energy >= (creep.carryCapacity * .9)) && creep.getActiveBodyparts(WORK)) {
            if (creep.build(conSites[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(conSites[0], { maxRooms: 1});
            }
            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 4: " + (Game.cpu.getUsed() - beginCPU));
        }
        else {
            var mineralNode = creep.room.find(FIND_MINERALS);
            var droppedEnergy1 = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: function (s) {
                    return s.pos.getRangeTo(creep.room.find(mineralNode[0]) > 10)
                }
            } );
            droppedEnergy1.sort(function(a,b) {
                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
            });
            var droppedEnergy = droppedEnergy1[0];

            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log('Dropsies: ' + droppedEnergy);
            if (droppedEnergy && creep.pos.getRangeTo(droppedEnergy) < 2 && creep.carry.energy < creep.carryCapacity) {
                creep.pickup(droppedEnergy);
            }
            if (creep.memory.filling && creep.carry.energy == 0) {
                creep.memory.filling = false;
                creep.say('harvesting');
            }
            if ((!creep.memory.filling && _.sum(creep.carry) == creep.carryCapacity) || creep.hits < creep.hitsMax * .8) {
                creep.memory.filling = true;
                creep.say('Transfering');
            }
            if (!creep.memory.filling && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.room.name != creep.memory.targetRoom) {
                    //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 7-1: " + (Game.cpu.getUsed() - beginCPU));
                    var exit = creep.room.findExitTo(creep.memory.targetRoom);
                    creep.moveTo(creep.pos.findClosestByRange(exit), {reusePath: 15,  maxRooms: 1, maxOps: 2000});
                    //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 7-1a: " + (Game.cpu.getUsed() - beginCPU));
                }
                else {
                    if ((((creep.pos.x < 2 || creep.pos.x > 47) || (creep.pos.y < 2 || creep.pos.x > 47) && creep.room.name == creep.memory.targetRoom))) creep.moveTo(25,25);

                    var sources = creep.pos.findClosestByRange(FIND_SOURCES);
                    //if((Game.cpu.getUsed() - beginCPU) > 2) console.log('Sources RM: ' + sources);
                    var dropMiners = creep.room.find(FIND_MY_CREEPS, {
                        filter: function(c) {
                            return (c.memory.role == 'remoteDropMiner') && (c.memory.targetRoom == creep.memory.targetRoom);
                        }
                    });
                    //if((Game.cpu.getUsed() - beginCPU) > 2) console.log('Sources: ' + sources);


                    //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + ': Tanks: ' + tanks);

                    if ( creep.pos.getRangeTo(droppedEnergy) < 2) creep.pickup(droppedEnergy);

                    if (droppedEnergy == undefined || droppedEnergy == null || creep.pos.getRangeTo(droppedEnergy) > 20 || droppedEnergy.energy < 100) {
                        //if((Game.cpu.getUsed() - beginCPU) > 2) console.log('test5');
                        /*if (tanks) {
                         //if((Game.cpu.getUsed() - beginCPU) > 2) console.log('test6');
                         if (creep.withdraw(tanks[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                         creep.moveTo(tanks[0]);
                         //if((Game.cpu.getUsed() - beginCPU) > 2) console.log('test 7');
                         creep.pickup(droppedEnergy);
                         }
                         }*/
                        var tanks = creep.room.find(FIND_STRUCTURES, {
                            filter: function (s) {
                                return s.structureType == (STRUCTURE_CONTAINER) && s.store[RESOURCE_ENERGY] >= ((creep.carryCapacity - _.sum(creep.carry)) * .35);
                            }
                        });

                        //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test sortA: " + (Game.cpu.getUsed() - beginCPU));
                        tanks.sort(function (a, b) {
                            return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                        });
                        //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test sortB: " + (Game.cpu.getUsed() - beginCPU));
                        if (tanks.length) {
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log('TankDetection: ' + creep.name + ' ' + tanks)
                            if (creep.withdraw(tanks[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(tanks[0], { maxRooms: 1});
                            }
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 2-1a: " + (Game.cpu.getUsed() - beginCPU));
                        }
                        else if (dropMiners.length < 1)
                        {
                            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(sources, { maxRooms: 1});
                            }
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 2-1b: " + (Game.cpu.getUsed() - beginCPU));
                        }
                        else if(creep.pos.getRangeTo(sources) < 2) {
                            creep.moveTo(25, 25);
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test : 2-1c" + (Game.cpu.getUsed() - beginCPU));
                        }
                        else if( creep.pos.getRangeTo(dropMiners[0]) > 6) {
                            creep.moveTo(dropMiners[0]);
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 2-1d: " + (Game.cpu.getUsed() - beginCPU));
                        }
                        //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 2-1: " + (Game.cpu.getUsed() - beginCPU));
                    }
                    else {
                        if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(droppedEnergy, { maxRooms: 1});
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 2-2: " + (Game.cpu.getUsed() - beginCPU));
                        }
                    }
                }
        if (((creep.pos.x == 0 || creep.pos.x == 49) || (creep.pos.y == 0 || creep.pos.x ==49))) creep.moveTo(25,25);
            }
            else {
                if (creep.room.name != creep.memory.home) {
                    //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 3-1a: " + (Game.cpu.getUsed() - beginCPU));
                    var exit = creep.room.findExitTo(creep.memory.home);
                    creep.moveTo(creep.pos.findClosestByRange(exit), {reusePath: 15,  maxRooms: 1});
                    //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 3-1: " + (Game.cpu.getUsed() - beginCPU));
                }
                else {
                    if (creep.memory.home == ('W39N76' || 'W39N75') && Game.spawns.Spawn2.room.energyAvailable >= 55000) {
                        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, { maxRooms: 1});
                        }
                        //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 3-2: " + (Game.cpu.getUsed() - beginCPU));
                    }
                    else {
                        if ((creep.memory.target == undefined)) {
                            var targets = [];
                            var targets = creep.room.find(FIND_STRUCTURES, {
                                filter: function(s) {
                                    return ((s.structureType == STRUCTURE_LINK && s.energy < 400 && creep.pos.getRangeTo(s) < 12) || s.structureType == STRUCTURE_CONTAINER && _.sum(s.store) < (s.storeCapacity - creep.carry))
                                }
                            });
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + ' ' + targets);
                            if (!targets.length) {
                                targets = creep.room.find(FIND_STRUCTURES, {
                                    filter: function(structure) {
                                        return ((structure.structureType == STRUCTURE_TOWER ) && (structure.energy < (structure.energyCapacity * .2)));
                                    }
                                });
                                //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + ' ' + targets);
                            }
                            
                            if (!targets.length) {
                                targets = creep.room.find(FIND_STRUCTURES, {
                                    filter: function(structure) {
                                        return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_TERMINAL || structure.structureType == STRUCTURE_CONTAINER) && (_.sum(structure.store) < structure.storeCapacity));
                                    }
                                });
                                //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + ' ' + targets);
                            }
                            targets.sort(function (a,b) {
                                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                            });
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + 'c  final ' + targets[0]);
                            creep.memory.target = targets[0];
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 4-1: " + (Game.cpu.getUsed() - beginCPU));
                        }
                        if (creep.memory.target != undefined) {
                            if (creep.transfer(Game.getObjectById(creep.memory.target.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(Game.getObjectById(creep.memory.target.id, { maxRooms: 1}));
                            }

                            var targetCheck = Game.getObjectById(creep.memory.target.id);
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(targetCheck);
                            if (Game.time % 4 == 0 || targetCheck == undefined || targetCheck.energy == targetCheck.energyCapacity) {
                                creep.memory.target = undefined;
                            }
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 5-1: " + (Game.cpu.getUsed() - beginCPU));
                        }
                        else if (_.sum(creep.carry) > 0 && creep.carry.energy != _.sum(creep.carry)) {
                            for (carriedResource in creep.carry) {
                                if (creep.transfer(creep.room.storage, carriedResource) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.storage, { maxRooms: 1});
                                }
                            }
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 5-2: " + (Game.cpu.getUsed() - beginCPU));
                        }
                    }
                }
            }
            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 15: " + (Game.cpu.getUsed() - beginCPU));
        }
    }
};

function priority(target) {

   if(target instanceof StructureSpawn) return 1;

   else if(target instanceof StructureExtension) return 1;

   else if(target instanceof StructureTower) return 2;

   else return 3;

}


module.exports = roleSKremoteMiner;