var roleremoteMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var beginCPU = Game.cpu.getUsed();
        
        var mineralNode = creep.room.find(FIND_MINERALS);
        Game.rooms[creep.room.name].memory.mineralID = mineralNode[0].id;
        ////if((Game.cpu.getUsed() - beginCPU) > 2) console.log('Available AttackeRs: ' + availableAttackers);
        var room = Game.rooms[creep.room.name];
        ////if((Game.cpu.getUsed() - beginCPU) > 5) console.log(creep.name + "Test 0-1a: " + (Game.cpu.getUsed() - beginCPU));
        if (creep.memory.targetRoomHostile > 0 ) creep.memory.targetRoomHostile -= 1;
        if (room.controller) {
            if (creep.memory.targetRoom == creep.room.name && room.controller.reservation) {
                Memory.stats['room.' + creep.room.name + '.reserveTicks'] = room.controller.reservation.ticksToEnd;
            }
            else if (!room.controller.reservation && creep.room.name == creep.memory.targetRoom) {
                Memory.stats['room.' + creep.room.name + '.reserveTicks'] = 0;
            }
            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 0-1: " + (Game.cpu.getUsed() - beginCPU));
        }
        var hostileCreepers = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function (c) {
                return c.owner.username != ('deft-code' || 'Source Keeper') && creep.pos.getRangeTo(c) < 8;
            }
        });
        if (hostileCreepers.length > 0) {
            creep.memory.targetRoomHostile = 12;
            var availableAttackers = _.filter(Game.creeps, (c) => c.memory.role == 'Attacker' && c.memory.engaged == false && c.memory.home == creep.memory.home && c.ticksToLive > 125
        )
            ;
        var spawnNames = Game.rooms[creep.memory.home].find(FIND_MY_SPAWNS);
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        var skLairs = creep.room.find(FIND_HOSTILE_STRUCTURES, {
            filter: function(s) {
                return s.structureType == STRUCTURE_KEEPER_LAIR;
            }
        });
        
            console.log(creep.room.name + ':  Available Defenders: ' + availableAttackers.length + '  |  ' + 'Number of Hostiles: ' + hostileCreepers.length)
            if (availableAttackers.length < hostileCreepers.length && skLairs.length == 0) {
                console.log('Available Defenders: ' + availableAttackers.length + '  |  ' + 'Number of Hostiles: ' + hostileCreepers.length)
                if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable  > 2300 ) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, MOVE, MOVE, HEAL, HEAL, HEAL, MOVE, RANGED_ATTACK, RANGED_ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK,MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, MOVE, MOVE, HEAL, HEAL, HEAL, MOVE, RANGED_ATTACK, RANGED_ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK], ['LUCY!-' + Math.floor(Math.random() * 1000)], {
                        role: 'Attacker',
                        home: creep.memory.home,
                        targetRoom: creep.memory.targetRoom.name,
                        engaged: false
                    });
                    console.log('Spawning new aTtAcKeR!: ' + newName);
                }
                if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 2300) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL], ['LUCY!-' + Math.floor(Math.random() * 1000)], {
                        role: 'Attacker',
                        home: creep.memory.home,
                        targetRoom: creep.memory.targetRoom.name,
                        engaged: false
                    });
                    console.log('Spawning new aTtAcKeR!: ' + newName);
                }
            }
            if (creep.room.name != 'W24N16' || creep.room.name != 'W24N15') {
                for (i in availableAttackers) {
                    availableAttackers[i].memory.targetRoom = creep.room.name;
                    availableAttackers[i].memory.engaged = true;

                }
            }
            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 0-2: " + (Game.cpu.getUsed() - beginCPU));
        }
        var damagedRoads = [];
        damagedRoads = creep.room.find(FIND_STRUCTURES, {
            filter: function (r) {
                return (r.hits < r.hitsMax && (r.structureType == STRUCTURE_ROAD) && creep.pos.getRangeTo(r) < 2) /*|| ((r.hits < r.hitsMax  * .5) && (r.structureType == STRUCTURE_ROAD))*/;
            }
        });
        var numConSites = creep.room.find(FIND_CONSTRUCTION_SITES)
        if (numConSites.length > 10) {
            Memory.stats['room.' + creep.room.name + '.needsBuilder'] = true;
        }
        else {
            Memory.stats['room.' + creep.room.name + '.needsBuilder'] = false;
        }
        var conSites = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: function (c) {
                return creep.pos.getRangeTo(c) < 10;
            }
        });
        if (creep.getActiveBodyparts(WORK) > 1) {
            conSites = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: function (c) {
                return creep.pos.getRangeTo(c) < 50;
            }
        });
        }

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

        if (creep.hits < creep.hitsMax * .8) creep.moveTo(creep.memory.home);
        
        if(creep.room.name != creep.memory.home && creep.memory.targetRoomHostile > 0) {
            var exit = creep.room.findExitTo(creep.memory.home);
            creep.moveTo(creep.pos.findClosestByPath(exit), {ignoreCreeps: true, reusePath: 15, maxRooms: 1});

            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 1: " + (Game.cpu.getUsed() - beginCPU));
        }
        else if (creep.room.name == creep.memory.home && creep.memory.targetRoomHostile > 0) {
            creep.moveTo(25,25);
            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 2: " + (Game.cpu.getUsed() - beginCPU));
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
        else if (damagedRoads.length && (creep.carry.energy > 0) && creep.getActiveBodyparts(WORK) > 1) {
            if (creep.repair(damagedRoads[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(damagedRoads[0], { maxRooms: 1});
            }
            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 2: " + (Game.cpu.getUsed() - beginCPU));
        }
        else if (conSites.length && (creep.carry.energy > 0) && creep.getActiveBodyparts(WORK) > 1) {
            if (creep.build(conSites[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(conSites[0], { maxRooms: 1});
            }
            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 4: " + (Game.cpu.getUsed() - beginCPU));
        }
        else {
            var dropMiners = creep.room.find(FIND_MY_CREEPS, {
                        filter: function(c) {
                            return (c.memory.role == 'remoteDropMiner') && (c.memory.targetRoom == creep.memory.targetRoom);
                        }
                    });
            var droppedEnergy1 = creep.room.find(FIND_DROPPED_RESOURCES);
            if (droppedEnergy1.length) {
                droppedEnergy1.sort(function(a,b) {
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                    //return b.amount - a.amount;
                });
                for (var i in droppedEnergy1) {
                    //console.log(droppedEnergy1[i].amount + ' ** ' + creep.pos.getRangeTo(droppedEnergy1[i]))
                    if (dropMiners.length && (droppedEnergy1[i].amount < 400 || creep.pos.getRangeTo(droppedEnergy1[i]) > 55)) {
                        droppedEnergy1.splice(i, 1);
                    }
                    
                }
                var droppedEnergy = droppedEnergy1[0];
                //if (droppedEnergy) console.log(droppedEnergy.amount + ' -- ' + creep.pos.getRangeTo(droppedEnergy))
            }
            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log('Dropsies: ' + droppedEnergy);

            if (creep.memory.filling && _.sum(creep.carry) == 0) {
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
                    creep.moveTo(creep.pos.findClosestByPath(exit), {reusePath: 5,  maxRooms: 1, maxOps: 2000});
                    //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 7-1a: " + (Game.cpu.getUsed() - beginCPU));
                }
                else {
                    if ((((creep.pos.x < 2 || creep.pos.x > 47) || (creep.pos.y < 2 || creep.pos.x > 47) && creep.room.name == creep.memory.targetRoom))) creep.moveTo(25,25);

                    var sources = creep.pos.findClosestByRange(FIND_SOURCES);
                    //if((Game.cpu.getUsed() - beginCPU) > 2) console.log('Sources RM: ' + sources);
                    
                    //if((Game.cpu.getUsed() - beginCPU) > 2) console.log('Sources: ' + sources);


                    //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + ': Tanks: ' + tanks);

                    if ( creep.pos.getRangeTo(droppedEnergy) < 2) creep.pickup(droppedEnergy);

                    if (!droppedEnergy || creep.pos.getRangeTo(droppedEnergy) > 50 || droppedEnergy.energy < 400) {
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
                            if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(droppedEnergy, { maxRooms: 1});
                            }
                            else if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(sources, { maxRooms: 1});
                            }
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 2-1b: " + (Game.cpu.getUsed() - beginCPU));
                        }
                        else if(creep.pos.getRangeTo(sources) < 2) {
                            creep.moveTo(25, 25);
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test : 2-1c" + (Game.cpu.getUsed() - beginCPU));
                        }
                        else if( creep.pos.getRangeTo(dropMiners[0]) > 9) {
                            creep.moveTo(dropMiners[0], { maxRooms: 1});
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
                    creep.moveTo(creep.pos.findClosestByRange(exit), {ignoreCreeps: true, reusePath: 15,  maxRooms: 1});
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
                        if (Game.time % 5 == 0) creep.memory.target = undefined;
                        if ((creep.memory.target == undefined)) {
                            var targets = [];
                            var targets = creep.room.find(FIND_STRUCTURES, {
                                filter: function(s) {
                                    return ((s.structureType == STRUCTURE_LINK && s.energy < 400 && creep.pos.getRangeTo(s) < 12))
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
                            
                            if (!targets.length || creep.carry.energy == 0) {
                                targets = creep.room.find(FIND_STRUCTURES, {
                                    filter: function(structure) {
                                        return ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_TERMINAL) && (_.sum(structure.store) < structure.storeCapacity));
                                    }
                                });
                                //if(1==1) console.log(creep.name + ' ' + targets);
                            }
                            targets.sort(function (a,b) {
                                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                            });
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + 'c  final ' + targets[0]);
                            creep.memory.target = targets[0];
                            //if((Game.cpu.getUsed() - beginCPU) > 2) console.log(creep.name + "Test 4-1: " + (Game.cpu.getUsed() - beginCPU));
                        }
                        if (creep.memory.target != undefined && creep.carry.energy > 0) {
                            if (creep.transfer(Game.getObjectById(creep.memory.target.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(Game.getObjectById(creep.memory.target.id), { maxRooms: 1});
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
                                if (creep.transfer(Game.getObjectById(creep.memory.target.id), carriedResource) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(Game.getObjectById(creep.memory.target.id), { maxRooms: 1});
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


module.exports = roleremoteMiner;