/**
 * Created by Andy on 1/1/2017.
 */
var roledropMiner = {

    /** @param {Creep} creep **/

    run: function(creep) {
        
        if (creep.memory.targetRoomHostile > 0 ) {
            creep.memory.targetRoomHostile -= 1;
        }
        /*var target = creep.room.find(FIND_HOSTILE_STRUCTURES, {
            filter: function(s) {
                return s.structureType == STRUCTURE_KEEPER_LAIR && s.ticksToSpawn > 0;
            }
        });
        target.sort(function(a,b) {
            return a.ticksToSpawn - b.ticksToSpawn;
        });*/
        var hostileCreepers = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function(c) {
                return c.owner.username != 'deft-code' && creep.pos.getRangeTo(c) < 7;
            }
        });
        
        var conSites = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: function (c) {
                return creep.pos.getRangeTo(c) < 3;
            }
        });
        var numConSites = creep.room.find(FIND_CONSTRUCTION_SITES)
        if (numConSites.length > 10) {
            Memory.stats['room.' + creep.room.name + '.needsBuilder'] = true;
        }
        else {
            Memory.stats['room.' + creep.room.name + '.needsBuilder'] = false;
        }
        var damagedRoads = [];
        damagedRoads = creep.room.find(FIND_STRUCTURES, {
            filter: function (r) {
                return r.hits < r.hitsMax && (r.structureType == STRUCTURE_ROAD) && creep.pos.getRangeTo(r) < 4;
            }
        });
        if (damagedRoads.length && (creep.carry.energy >= (creep.carryCapacity * .85)) && creep.getActiveBodyparts(WORK)) {
            if (creep.repair(damagedRoads[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(damagedRoads[0], { maxRooms: 1});
            }
        }
        var target = creep.room.find(FIND_HOSTILE_STRUCTURES, {
            filter: function(s) {
                return s.structureType == STRUCTURE_KEEPER_LAIR && s.ticksToSpawn < 10 && creep.pos.getRangeTo(s) < 7;
            }
        });
        target.sort(function(a,b) {
            return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
        });
        //console.log('LAIRs: ' + target);
        var containers = [];
        containers = creep.room.find(FIND_STRUCTURES, {
            filter: function (r) {
                return r.structureType == STRUCTURE_CONTAINER && creep.pos.getRangeTo(r) < 3;
            }
        });
        containers.sort(function(a,b) {
            return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
        });
        //var creepFound = creep.room.lookForAt(LOOK_CREEPS, containers[0].pos);
        //if (containers[0].pos != creep.pos && creepFound.length) containers.splice(0,1);
        if (hostileCreepers.length > 0 && creep.room.name != creep.memory.home) {
            var availableAttackers = _.filter(Game.creeps, (c) => c.memory.role == 'Attacker' && c.memory.engaged == false && c.memory.home == creep.memory.home);
            console.log('Available AttackeRs: ' + availableAttackers);

            creep.memory.targetRoomHostile = 10;
            if (creep.room.name != 'W24N16') {
                for (i in availableAttackers) {
                    availableAttackers[i].memory.targetRoom = creep.room.name;
                    availableAttackers[i].memory.engaged = true;

                }
            }
        }
        /*if (target.length) {
            console.log(target[0].ticksToSpawn);
            if (target[0].ticksToSpawn < 20) {
                creep.memory.targetRoomHostile = 14;
                for (i in availableAttackers) {
                    availableAttackers[i].memory.targetRoom = creep.room.name;

                }
            }
        }*/
        if (creep.memory.targetRoomHostile > 0 ) creep.memory.targetRoomHostile -= 1;
        if ( creep.hits < creep.hitsMax * .5) {
            var exit = creep.room.findExitTo(creep.memory.home);
            creep.moveTo(creep.pos.findClosestByRange(exit), {reusePath: 3});
        }
        else if (containers.length && (containers[0].hits < containers[0].hitsMax)&& (creep.carry.energy >= (creep.carryCapacity * .8)) && creep.getActiveBodyparts(WORK) > 0) {
            creep.repair(containers[0]);
        }
        else if (containers.length > 1 && (containers[1].hits < containers[1].hitsMax)&& (creep.carry.energy >= (creep.carryCapacity * .8)) && creep.getActiveBodyparts(WORK) > 0) {
            creep.repair(containers[1]);
        }
        else if (containers.length  > 2 && (containers[2].hits < containers[2].hitsMax)&& (creep.carry.energy >= (creep.carryCapacity * .8)) && creep.getActiveBodyparts(WORK) > 0) {
            creep.repair(containers[2]);
        }
        else if (conSites.length && (creep.carry.energy >= (creep.carryCapacity * .8)) && creep.getActiveBodyparts(WORK) > 0) {
            creep.build(conSites[0]);
        }
        if(creep.room.name != creep.memory.home && (creep.memory.targetRoomHostile > 0 || target[0])) {
            var exit = creep.room.findExitTo(creep.memory.home);
            creep.moveTo(creep.pos.findClosestByRange(exit), {reusePath: 3});
        }
        else if (creep.memory.targetRoomHostile > 0) {
            if (creep.room.name == creep.memory.home){
                let pos = new RoomPosition(25,25, creep.room.name)
                creep.moveTo(pos);
            }
        }
        else if (creep.room.name != creep.memory.targetRoom) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit), { maxRooms: 1});
        }
        else {
            var containers = [];
            containers = creep.room.find(FIND_STRUCTURES, {
                filter: function (r) {
                    return r.structureType == STRUCTURE_CONTAINER && creep.pos.getRangeTo(r) < 3 && _.sum(r.store) < r.storeCapacity;
                }
            });
            containers.sort(function(a,b) {
                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
            });
            var counter = 0;
            while (counter < containers.length) {
                var creepsFound = creep.room.lookForAt(LOOK_CREEPS, containers[0]);
                if ( creepsFound.length && creepsFound[0].pos != creep.pos) containers.splice(0,1);
                counter++;
            }
            if (creep.memory.sourceID == undefined || Game.time % 10 == 0) {
                //console.log(creep.name + ' test 1');
                var sources = creep.room.find(FIND_SOURCES);
                sources.sort(function(a,b) {
                    return creep.pos.getRangeTo(b) - creep.pos.getRangeTo(a);
                })
                if (sources.length > 1) {
                    //console.log(creep.name + ' test 2');
                    var dropCreeps = creep.room.find(FIND_MY_CREEPS, {
                        filter: function (c) {
                            return c.memory.role == 'remoteDropMiner' && c.memory.targetRoom == c.room.name;
                        }
                    });
                    for (i in sources) {
                        if (_.some(dropCreeps, c => c.memory.sourceID == sources[i].id))
                        {
                            //console.log(creep.name + ' test 3');
                            continue;
                        }
                        else
                        {
                            creep.memory.sourceID = sources[i].id;
                            //console.log(creep.name + ' test 4');
                        }
                    };
                }
                else {
                    creep.memory.sourceID = sources[0].id;
                    //console.log(creep.name + ' test 5');
                }
            }
            else if (creep.pos.getRangeTo(containers[0]) > 0 && creep.pos.getRangeTo(containers[0]) < 4 && creep.pos.getRangeTo(Game.getObjectById(creep.memory.sourceID)) < 3) {
                creep.moveTo(containers[0], {maxRooms: 1});
            }
            else if(_.sum(creep.carry) == creep.carryCapacity && creep.pos.getRangeTo(Game.getObjectById(creep.memory.sourceID)) < 3 && !containers[0] && !conSites[0]) {
                
            }
            else if (creep.harvest(Game.getObjectById(creep.memory.sourceID)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.sourceID), { maxRooms: 1, reusePath: 5, ignoreCreeps: false});
            }
            else if ( Game.getObjectById(creep.memory.sourceID).energy == 0 && creep.carry.energy < creep.carryCapacity) {
                var droppedEnergy1 = creep.room.find(FIND_DROPPED_RESOURCES );
                droppedEnergy1.sort(function(a,b) {
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                });
                var droppedEnergy = droppedEnergy1[0];
                if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE && creep.pos.getRangeTo(droppedEnergy) < 2) creep.moveTo(droppedEnergy);
                if (creep.pos.getRangeTo(Game.getObjectById(creep.memory.sourceID)) < 5) creep.moveTo(creep.memory.home);
            }
            

            }
        if (((creep.pos.x == 0 || creep.pos.x == 49) || (creep.pos.y == 0 || creep.pos.x ==49))) creep.moveTo(25,25);
        if (creep.hits < creep.hitsMax * .8) creep.moveTo(creep.memory.home);
        }
    };

module.exports = roledropMiner;