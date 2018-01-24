/**
 * Created by Andy on 1/10/2017.
 */
var remoteMining = {
    run: function(homeRoom, miningRoom, numSpawns, extraMiners = 0, roomDist = 0) {
        var dropMiners = _.sum(Game.creeps, (c) => c.memory.targetRoom == miningRoom && c.memory.role == 'remoteDropMiner' && ((c.ticksToLive > 125 + (roomDist * 50)) || (c.ticksToLive == undefined)));
        var spawnNames = Game.rooms[homeRoom].find(FIND_MY_SPAWNS);
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        //console.log(dropMiners);
        var remoteMiners = _.sum(Game.creeps, (c) => c.memory.targetRoom == miningRoom && c.memory.role == 'remoteMiner' && ((c.ticksToLive > 125 + (roomDist * 50)) || (c.ticksToLive == undefined)));
        //console.log('RMs: ' + remoteMiners);
        var remoteClaimers = _.sum(Game.creeps, (c) => c.memory.targetRoom == miningRoom && c.memory.role == 'claimer' && ((c.ticksToLive > 150 + (roomDist * 50)) || (c.ticksToLive == undefined)));
        //console.log(spawnNames[0].name + '-' + miningRoom + '  Claimers: ' + remoteClaimers);
        if ((dropMiners < 1 * numSpawns) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 550 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 700 && spawnNames.length > 1) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], ['Drop Miner-' + Math.floor(Math.random() * 1000)], {
                role: 'remoteDropMiner',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log('Number of remoteDropMiners for room '+ miningRoom + ': ' + dropMiners);
            //console.log('Spawning new remoteDropMiner: ' + newName);
        }
        else if ((dropMiners < 1 * numSpawns) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 550 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 700) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], ['Drop Miner-' + Math.floor(Math.random() * 1000)], {
                role: 'remoteDropMiner',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log('Number of remoteDropMiners for room '+ miningRoom + ': ' + dropMiners);
            //console.log('Spawning new remoteDropMiner: ' + newName);
        }
        else if ((dropMiners < 1 * numSpawns) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 750 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1250 && spawnNames.length > 1) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], ['Drop Miner-' + Math.floor(Math.random() * 1000)], {
                role: 'remoteDropMiner',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log('Number of remoteDropMiners for room '+ miningRoom + ': ' + dropMiners);
            //console.log('Spawning new remoteDropMiner: ' + newName);
        }
        else if ((dropMiners < 1 * numSpawns) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 750 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1250) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], ['Drop Miner-' + Math.floor(Math.random() * 1000)], {
                role: 'remoteDropMiner',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log('Number of remoteDropMiners for room '+ miningRoom + ': ' + dropMiners);
            //console.log('Spawning new remoteDropMiner: ' + newName);
        }
        else if ((dropMiners < 1 * numSpawns) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1300 && spawnNames.length > 1) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY], ['Remote Drop Miner-' + Math.floor(Math.random() * 1000)], {
                role: 'remoteDropMiner',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log('Number of remoteDropMiners for room '+ miningRoom + ': ' + dropMiners);
            //console.log('Spawning new remoteDropMiner: ' + newName);
        }
        else if ((dropMiners < 1 * numSpawns) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1300) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY], ['Remote Drop Miner-' + Math.floor(Math.random() * 1000)], {
                role: 'remoteDropMiner',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log('Number of remoteDropMiners for room '+ miningRoom + ': ' + dropMiners);
            //console.log('Spawning new remoteDropMiner: ' + newName);
        }
        else if ((remoteClaimers < 1) && (Memory.stats['room.' + miningRoom + '.reserveTicks'] < 3000) && Game.spawns[spawnNames[0].name].room.energyAvailable >= 5600 && spawnNames.length > 1) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([CLAIM, CLAIM, CLAIM, CLAIM, MOVE, CLAIM, CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE], ['Claimer-' + Math.floor(Math.random() * 1000)], {
                role: 'claimer',
                home: homeRoom,
                targetRoom: miningRoom
            });
        }
        else if ((remoteClaimers < 1) && (Memory.stats['room.' + miningRoom + '.reserveTicks'] < 2000) && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable > 1250 && spawnNames.length > 1) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([CLAIM, CLAIM, MOVE, MOVE], ['Claimer-' + Math.floor(Math.random() * 1000)], {
                role: 'claimer',
                home: homeRoom,
                targetRoom: miningRoom
            });
        }
        else if ((remoteClaimers < 1) && (Memory.stats['room.' + miningRoom + '.reserveTicks'] < 3000) && Game.spawns[spawnNames[0].name].room.energyAvailable >= 5600) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([CLAIM, CLAIM, CLAIM, CLAIM, MOVE, CLAIM, CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE], ['Claimer-' + Math.floor(Math.random() * 1000)], {
                role: 'claimer',
                home: homeRoom,
                targetRoom: miningRoom
            });
        }
        else if ((remoteClaimers < 1) && (Memory.stats['room.' + miningRoom + '.reserveTicks'] < 2000)  && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable > 1250) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([CLAIM, CLAIM, MOVE, MOVE], ['Claimer-' + Math.floor(Math.random() * 1000)], {
                role: 'claimer',
                home: homeRoom,
                targetRoom: miningRoom
            });
            //console.log( homeRoom + 'testetetestsetstes');
        }
        else if (remoteMiners < ((2 * numSpawns) + extraMiners)) {
                //console.log('Number of remoteMiners for room ' + miningRoom + ': ' + remoteMiners);
                if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 500 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 750) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], ['Remote Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'remoteMiner',
                        home: homeRoom,
                        targetRoom: miningRoom,
                        filling: false
                    });
                    //console.log('Spawning new remoteMiner: ' + newName);
                }
                if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 800 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1150) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], ['Remote Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'remoteMiner',
                        home: homeRoom,
                        targetRoom: miningRoom,
                        filling: false
                    });
                    //console.log('Spawning new remoteMiner: ' + newName);
                }
                if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1300 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1750) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], ['Remote Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'remoteMiner',
                        home: homeRoom,
                        targetRoom: miningRoom,
                        filling: false
                    });
                    //console.log('Spawning new remoteMiner: ' + newName);
                }
            if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1800 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 2250) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Remote Miner-' + Math.floor(Math.random() * 1000)], {
                    role: 'remoteMiner',
                    home: homeRoom,
                    targetRoom: miningRoom,
                    filling: false
                });
                //console.log('Spawning new remoteMiner: ' + newName);
            }
            if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 2300 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 2300) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Remote Miner-' + Math.floor(Math.random() * 1000)], {
                    role: 'remoteMiner',
                    home: homeRoom,
                    targetRoom: miningRoom,
                    filling: false
                });
                //console.log('Spawning new remoteMiner: ' + newName);
            }
            if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 2350 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 5550) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Remote Miner-' + Math.floor(Math.random() * 1000)], {
                    role: 'remoteMiner',
                    home: homeRoom,
                    targetRoom: miningRoom,
                    filling: false
                });
                //console.log('Spawning new remoteMiner: ' + newName);
            }
                if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 5600) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Remote Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'remoteMiner',
                        home: homeRoom,
                        targetRoom: miningRoom,
                        filling: false
                    });
                    //console.log('Spawning new remoteMiner: ' + newName);
                }
            }
        }

            //console.log('Spawning new claimer: ' + newName);
        };

module.exports = remoteMining;