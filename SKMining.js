/**
 * Created by Andy on 1/10/2017.
 */
var SKMining = {
    run: function(homeRoom, miningRoom, numSpawns, extraMiners = 0, extraMinerals = 0, centerRoom = false) {
        var dropMiners = _.sum(Game.creeps, (c) => c.memory.targetRoom == miningRoom && c.memory.home == homeRoom && c.memory.role == 'remoteDropMiner' && ((c.ticksToLive > 225) || (c.ticksToLive == undefined)));
        var spawnNames = Game.rooms[homeRoom].find(FIND_MY_SPAWNS);
        //console.log(miningRoom + ': ' + ( 4 + extraMinerals));
        
       
        if (Game.rooms[miningRoom] && Game.rooms[miningRoom].memory.mineralID != undefined) var mineralNode = Game.getObjectById(Game.rooms[miningRoom].memory.mineralID);
        if (mineralNode && mineralNode.mineralType == "H" ) var minType = 'RESOURCE_HYDROGEN';
        if (mineralNode && mineralNode.mineralType == "O" ) var minType = 'RESOURCE_OXYGEN';
        if (mineralNode && mineralNode.mineralType == "X" ) var minType = 'RESOURCE_CATALYST';
        //if (mineralNode) console.log(miningRoom + ' -- ' + mineralNode.id); 
        if (spawnNames) spawnNames.reverse();
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        //console.log(dropMiners);
        var remoteMiners = _.sum(Game.creeps, (c) => c.memory.targetRoom == miningRoom && c.memory.home == homeRoom && c.memory.role == 'remoteMiner' && ((c.ticksToLive > 250) || (c.ticksToLive === undefined)));
        var mineralMiners = _.sum(Game.creeps, (c) => c.memory.targetRoom == miningRoom && c.memory.home == homeRoom && c.memory.role == 'mineralMiner' && ((c.ticksToLive > 250) || (c.ticksToLive === undefined)));
        //console.log('RMs: ' + remoteMiners);
        var SKAttackers = _.sum(Game.creeps, (c) => c.memory.targetRoom == miningRoom && c.memory.home == homeRoom && c.memory.role == 'SKAttacker' && ((c.ticksToLive >= 300) || (c.ticksToLive === undefined)));
        if (miningRoom == 'W25N15') SKAttackers = _.sum(Game.creeps, (c) => (c.memory.targetRoom == miningRoom || c.memory.targetRoom == 'W26N15') && c.memory.home == homeRoom && c.memory.role == 'SKAttacker' && ((c.ticksToLive >= 300) || (c.ticksToLive === undefined)));
        //console.log(spawnNames[0].name + ' - ' + miningRoom + '  Claimers: ' + remoteClaimers);
        //console.log(SKAttackers);
        if (miningRoom in Game.rooms) {
            var numHostiles = Game.rooms[miningRoom].find(FIND_HOSTILE_CREEPS);
            if ( centerRoom == true) {
                var numAttackers = 0;
            }
            else if (numHostiles.length >= 5) {
               var numAttackers = 3;
            }
            else {
                var numAttackers = 2;
            }
        }
        else if (((dropMiners + remoteMiners + mineralMiners + SKAttackers) == 0) && centerRoom == false) {
            var numAttackers = 1;
        }
        else {
            var numAttackers = 1;
        }
        
        if (SKAttackers < numAttackers) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], ['SK-LUCY! - ' + Math.floor(Math.random() * 1000)], {
                role: 'SKAttacker',
                home: homeRoom,
                targetRoom: miningRoom,
                engaged: false
            });
            console.log('Spawning new SK aTtAcKeR!: ' + newName);
        }
        else if ((dropMiners < 1 * numSpawns) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 550 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 700 && spawnNames.length > 1) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], ['SKDropMiner - ' + Math.floor(Math.random() * 1000)], {
                role: 'remoteDropMiner',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log('Number of remoteDropMiners for room '+ miningRoom + ': ' + dropMiners);
            //console.log('Spawning new remoteDropMiner: ' + newName);
        }
        else if ((dropMiners < 1 * numSpawns) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 550 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 700) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], ['SKDropMiner - ' + Math.floor(Math.random() * 1000)], {
                role: 'remoteDropMiner',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log('Number of remoteDropMiners for room '+ miningRoom + ': ' + dropMiners);
            //console.log('Spawning new remoteDropMiner: ' + newName);
        }
        else if ((dropMiners < 1 * numSpawns) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 750 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1250 && spawnNames.length > 1) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], ['SKDropMiner - ' + Math.floor(Math.random() * 1000)], {
                role: 'remoteDropMiner',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log('Number of remoteDropMiners for room '+ miningRoom + ': ' + dropMiners);
            //console.log('Spawning new remoteDropMiner: ' + newName);
        }
        else if ((dropMiners < 1 * numSpawns) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 750 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1250) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], ['SKDropMiner - ' + Math.floor(Math.random() * 1000)], {
                role: 'remoteDropMiner',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log('Number of remoteDropMiners for room '+ miningRoom + ': ' + dropMiners);
            //console.log('Spawning new remoteDropMiner: ' + newName);
        }
        else if ((dropMiners < 1 * numSpawns) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1300 && spawnNames.length > 1) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], ['SKDropMiner - ' + Math.floor(Math.random() * 1000)], {
                role: 'remoteDropMiner',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log('Number of remoteDropMiners for room '+ miningRoom + ': ' + dropMiners);
            //console.log('Spawning new remoteDropMiner: ' + newName);
        }
        else if ((dropMiners < 1 * numSpawns) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1300) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], ['SKDropMiner - ' + Math.floor(Math.random() * 1000)], {
                role: 'remoteDropMiner',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log('Number of remoteDropMiners for room '+ miningRoom + ': ' + dropMiners);
            //console.log('Spawning new remoteDropMiner: ' + newName);
        }
        else if (remoteMiners < ((2 * numSpawns) + extraMiners)) {
                //console.log('Number of remoteMiners for room ' + miningRoom + ': ' + remoteMiners);
            if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 500 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 750) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], ['SKRemoteMiner - ' + Math.floor(Math.random() * 1000)], {
                    role: 'remoteMiner',
                    home: homeRoom,
                    targetRoom: miningRoom,
                    filling: false
                });
                //console.log('Spawning new remoteMiner: ' + newName);
            }
            if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 800 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1150) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], ['SKRemoteMiner - ' + Math.floor(Math.random() * 1000)], {
                    role: 'remoteMiner',
                    home: homeRoom,
                    targetRoom: miningRoom,
                    filling: false
                });
                //console.log('Spawning new remoteMiner: ' + newName);
            }
            if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1300 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1750) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], ['SKRemoteMiner - ' + Math.floor(Math.random() * 1000)], {
                    role: 'remoteMiner',
                    home: homeRoom,
                    targetRoom: miningRoom,
                    filling: false
                });
                //console.log('Spawning new remoteMiner: ' + newName);
            }
            if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1800 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 2300) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Remote Miner - ' + Math.floor(Math.random() * 1000)], {
                    role: 'remoteMiner',
                    home: homeRoom,
                    targetRoom: miningRoom,
                    filling: false
                });
                //console.log('Spawning new remoteMiner: ' + newName);
            }
            if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 2350 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 5550) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['SKRemoteMiner - ' + Math.floor(Math.random() * 1000)], {
                    role: 'remoteMiner',
                    home: homeRoom,
                    targetRoom: miningRoom,
                    filling: false
                });
                //console.log('Spawning new remoteMiner: ' + newName);
            }
            if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 5600 && (Memory.stats['room.' + miningRoom + '.needsBuilder'] == false || Memory.stats['room.' + miningRoom + '.needsBuilder'] == undefined)) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], ['SKRemoteMiner - ' + Math.floor(Math.random() * 1000)], {
                    role: 'remoteMiner',
                    home: homeRoom,
                    targetRoom: miningRoom,
                    filling: false
                });
                //console.log('Spawning new remoteMiner: ' + newName);
            }
            if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 5600 && (Memory.stats['room.' + miningRoom + '.needsBuilder'] == true || Memory.stats['room.' + miningRoom + '.needsBuilder'] == undefined)) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], ['SKRemoteMiner - ' + Math.floor(Math.random() * 1000)], {
                    role: 'remoteMiner',
                    home: homeRoom,
                    targetRoom: miningRoom,
                    filling: false
                });
                //console.log('Spawning new remoteMiner: ' + newName);
            }
            }
            else if (Game.rooms[miningRoom] && mineralNode.mineralAmount > 0 && Game.rooms[homeRoom].terminal && (Game.rooms[homeRoom].terminal.store[minType] < 100000 || !Game.rooms[homeRoom].terminal.store[minType]) && mineralMiners < (4 + extraMinerals)) {
                if (Game.spawns[spawnNames[0].name].room.controller.level == 6) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Mineral Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'mineralMiner',
                        home: homeRoom,
                        targetRoom: miningRoom
                    });
                    console.log('Spawning new mineralMiner: ' + newName);
                }
                if ( Game.spawns[spawnNames[0].name].room.controller.level >= 7) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Mineral Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'mineralMiner',
                        home: homeRoom,
                        targetRoom: miningRoom
                    });
                    console.log('Spawning new mineralMiner: ' + newName);
                }
            }
        }

            //console.log('Spawning new claimer: ' + newName);
        };

module.exports = SKMining;