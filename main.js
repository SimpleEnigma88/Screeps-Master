var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleBuilder2 = require('role.builder2');
var roleRepairer = require('role.repairer');
var roletowerFiller = require('role.towerFiller');
var roleClaimer = require('role.claimer');
var roledropMiner = require('role.dropMiner');
var roleAttacker = require('role.attacker');
var rolemineralMiner = require('role.mineralMiner');
var rolelinkFiller = require('role.linkFiller');
var roleremoteMiner = require('role.remoteMiner');
var roleSKremoteMiner = require('role.SKremoteMiner');
var roletransferCreep = require('role.transferCreep');
var roleremoteDropMiner = require('role.remoteDropMiner');
var remoteMining = require('remoteMining');
var SKMining = require('SKMining');
var LinkLogic = require('LinkLogic');
var roletransport = require('role.transport');
var roleSKAttacker = require('role.SKAttacker');
var Traveler = require('Traveler');
var roleInvader = require('role.invader');
require('prototype.room')();

module.exports.loop = function () {
    if (Memory.stats == undefined) {
        Memory.stats = {}
    }

    console.log('CPU Final: ' + Game.cpu.getUsed());
    
    
    var rooms = Game.rooms
    var spawns = Game.spawns
    for (let roomKey in rooms) {
        let room = Game.rooms[roomKey]

        var isMyRoom = (room.controller ? room.controller.my : 0)
        if (isMyRoom) {
            Memory.stats['room.' + room.name + '.myRoom'] = 1
            Memory.stats['room.' + room.name + '.energyAvailable'] = room.energyAvailable
            Memory.stats['room.' + room.name + '.energyCapacityAvailable'] = room.energyCapacityAvailable
            Memory.stats['room.' + room.name + '.controllerProgress'] = room.controller.progress
            Memory.stats['room.' + room.name + '.controllerProgressTotal'] = room.controller.progressTotal
            var stored = 0
            var storedTotal = 0

            if (room.storage) {
                stored = room.storage.store[RESOURCE_ENERGY]
                storedTotal = room.storage.storeCapacity[RESOURCE_ENERGY]
            } else {
                stored = 0
                storedTotal = 0
            }

            Memory.stats['room.' + room.name + '.storedEnergy'] = stored
        }else {
            Memory.stats['room.' + room.name + '.myRoom'] = undefined
        }
    }
    var totalCreepers = Game.creeps
    Memory.stats['gcl.progress'] = Game.gcl.progress
    Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal
    Memory.stats['gcl.level'] = Game.gcl.level
    for (let spawnKey in spawns) {
        let spawn = Game.spawns[spawnKey]
        Memory.stats['spawn.' + spawn.name + '.defenderIndex'] = spawn.memory['defenderIndex']
    }
    Memory.stats['creeps.total'] = totalCreepers.length
    Memory.stats['cpu.bucket'] = Game.cpu.bucket
    Memory.stats['cpu.limit'] = Game.cpu.limit
    Memory.stats['cpu.getUsed'] = Game.cpu.getUsed()
    PathFinder.use(true);
    var remoteExecution = false;
    console.log("-----------= RUN " + Game.time + ", Bucket:" + Game.cpu.bucket + " =-----------");
    var counter2 = 0;
    var maxCreepCPU = 0;
            for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                //console.log('Clearing non-existing creep memory:' + name);
            }
        }
        ;
    for (var name in Game.creeps) {
        counter2++;
        counter = Game.cpu.getUsed();
        var creep = Game.creeps[name];
        //var nearSpawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
        //if (creep.pos.getRangeTo(nearSpawn) < 2) creep.moveTo(25,25);
        
        
        if (creep.memory.role == 'invader'){
            roleInvader.run(creep);
        }
        if (creep.memory.role == 'Attacker') {
            roleAttacker.run(creep);
        }
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'dropMiner') {
            roledropMiner.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'builder2') {
            roleBuilder2.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'towerFiller') {
            roletowerFiller.run(creep);
        }
        if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if (creep.memory.role == 'mineralMiner') {
            rolemineralMiner.run(creep);
        }
        if (creep.memory.role == 'linkFiller') {
            rolelinkFiller.run(creep);
        }
        if (creep.memory.role == 'remoteMiner') {
            roleremoteMiner.run(creep);
            //if (creep.memory.home == 'W27N14') creep.memory.home = 'W25N13';
        }
        if (creep.memory.role == 'SKremoteMiner') {
            roleSKremoteMiner.run(creep);
        }
        if (creep.memory.role == 'transferCreep') {
            roletransferCreep.run(creep);
        }
        if (creep.memory.role == 'remoteDropMiner') {
            roleremoteDropMiner.run(creep);
        }
        if (creep.memory.role == 'transport') {
            roletransport.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            //if (creep.room.name == 'W25N13') creep.memory.role = 'builder';
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'SKAttacker') {
            roleSKAttacker.run(creep);
        }
        
        
        
        
        //if ((Game.cpu.getUsed() - counter) > maxCreepCPU) {
            //maxCreepCPU = (Game.cpu.getUsed() - counter);
            //console.log('CPU used for creep named ' + name + "' = " + parseFloat(Game.cpu.getUsed() - counter));
       // }
    }
    
    console.log('Total Creeps: ' + counter2);
    var roomNames = Game.rooms;
/*
    var orders = Game.market.orders;
    console.log(orders);
    for (const id in orders){
        //console.log(id);
        if (Game.market.orders[id].remainingAmount < 1) Game.market.cancelOrder(id);
    }
*/


    for (var roomNumber in roomNames) {
        
            if (roomNumber == 'W24N14') {
                Game.rooms.W24N14.createConstructionSite(5,38,STRUCTURE_CONTAINER);
            }
            if (roomNumber == 'W24N15') {
                Game.rooms.W24N15.createConstructionSite(11,37,STRUCTURE_CONTAINER);
            }
            if (roomNumber == 'W26N15') {
                Game.rooms.W26N15.createConstructionSite(44,17,STRUCTURE_CONTAINER);
            }
            if (roomNumber == 'W26N14') {
                Game.rooms.W26N14.createConstructionSite(32,41,STRUCTURE_CONTAINER);
            }
            if (roomNumber == 'W25N14') {
                Game.rooms.W25N14.createConstructionSite(16,6,STRUCTURE_CONTAINER);
            }
            if (roomNumber == 'W25N15') {
                Game.rooms.W25N15.createConstructionSite(38,44,STRUCTURE_CONTAINER);
                Game.rooms.W25N15.createConstructionSite(38,45,STRUCTURE_CONTAINER);
            }
        
        /*if (roomNumber == 'W25N13') {
            var targets = Game.rooms.W25N13.find(FIND_HOSTILE_STRUCTURES);
            console.log(targets)
            targets[0].destroy();
        }*/
        /*MARKET CODE: EXCESS ENERGY SALES*/

        var roomTerminal = Game.rooms[roomNumber].terminal;
        //console.log(roomTerminal);
   //console.log('Pre Market CPU: ' + Game.cpu.getUsed());
        if (1 == 1 && Game.rooms[roomNumber].terminal && Game.rooms[roomNumber].storage && Game.rooms[roomNumber].storage.store[RESOURCE_ENERGY] > 250000 && roomTerminal.store[RESOURCE_ENERGY] > 50000 && Game.time % 1 == 0 && Game.rooms[roomNumber].controller.level == 8 && roomNumber != 'bob') {
            var salePrice = .05;
            //console.log('Market Test!');
            if (roomTerminal.store[RESOURCE_ENERGY] > 25000) salePrice = .00;
            var beforeEnergyTotal = roomTerminal.store[RESOURCE_ENERGY];
            //console.log(roomNumber + ': ' + roomTerminal.store[RESOURCE_ENERGY]);
            var allEnergyBuyOrders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY});
            //console.log(allEnergyBuyOrders.length);
            if (allEnergyBuyOrders.length && roomTerminal.cooldown == 0) {
                //console.log('Number of Orders: ' + allEnergyBuyOrders.length);
/*
                allEnergyBuyOrders.sort(function (a, b) {
                    return Game.map.getRoomLinearDistance(a.roomName, roomNumber, true) - Game.map.getRoomLinearDistance(b.roomName, roomNumber, true);
                });*/
                allEnergyBuyOrders.sort(function(a,b) {
                    return b.price - a.price;
                })
                //console.log("Before: " + allEnergyBuyOrders[0].price);
                if(allEnergyBuyOrders.length > 0) {
                while(allEnergyBuyOrders.length > 1 && ((allEnergyBuyOrders[0].amount < 50) || allEnergyBuyOrders[0].roomName == 'W23N16' || allEnergyBuyOrders[0].roomName == 'W23N15' || allEnergyBuyOrders[0].roomName == 'W27N16' || allEnergyBuyOrders[0].roomName == 'W27N14' || allEnergyBuyOrders[0].roomName == 'W25N13')) {
                    if(allEnergyBuyOrders[0].amount < 50 || allEnergyBuyOrders[0].roomName == 'W23N16' || allEnergyBuyOrders[0].roomName == 'W23N15' || allEnergyBuyOrders[0].roomName == 'W27N16' || allEnergyBuyOrders[0].roomName == 'W27N14' || allEnergyBuyOrders[0].roomName == 'W25N13') allEnergyBuyOrders.splice(0, 1);
                }
                    
                }
                //console.log("After: " + allEnergyBuyOrders[0].price);
                //console.log('# of orders after filtering: ' + allEnergyBuyOrders.length);
                if (allEnergyBuyOrders.length) {
                console.log('Number of Orders: ' + allEnergyBuyOrders.length);
                console.log('Order Distance: ' + Game.map.getRoomLinearDistance(allEnergyBuyOrders[0].roomName, roomNumber, true));
                console.log('Order Price: ' + allEnergyBuyOrders[0].price);
                console.log('Total Order Amount: ' + allEnergyBuyOrders[0].amount);
                var orderPrice = allEnergyBuyOrders[0].price;
                if (Game.map.getRoomLinearDistance(allEnergyBuyOrders[0].roomName, roomNumber, true) < 75 && allEnergyBuyOrders[0].price >= salePrice) {
                    var transCost = Game.market.calcTransactionCost(100, allEnergyBuyOrders[0].roomName, roomNumber);
                    var transPercentage = (transCost + 100) / 100;
                    console.log(transPercentage);
                    if (allEnergyBuyOrders[0].amount / transPercentage > roomTerminal.store[RESOURCE_ENERGY]) {

                        var orderAmount = roomTerminal.store[RESOURCE_ENERGY] / transPercentage;
                    }
                    else if (allEnergyBuyOrders[0].amount > 3000) {
                        var orderAmount = allEnergyBuyOrders[0].amount / transPercentage;
                    }
                    else if (allEnergyBuyOrders[0].amount < 3000) {
                        var orderAmount = allEnergyBuyOrders[0].amount;
                    }
                    var transactionAmount = Math.min(roomTerminal.store[RESOURCE_ENERGY] / transPercentage, orderAmount);

                    if(Game.market.deal(allEnergyBuyOrders[0].id, transactionAmount, roomNumber) == OK) {
                    
                    console.log('Amount Sending: ' + transactionAmount);
                    console.log('Cost to send: ' + (transCost * (transactionAmount / 100) ));
                    console.log('True credits per energy sold: ' + ((orderPrice * transactionAmount)/(transactionAmount + (transCost * (transactionAmount / 100) ))));
                    }
                }
                }
            }
        }
    //console.log('Post Market CPU: ' + Game.cpu.getUsed());
        let room = Game.rooms[roomNumber];
        if(Game.time % 1 == 0) {
        new RoomVisual().clear();
        if (room.storage) {

            room.visual.text(room.storage.store[RESOURCE_ENERGY], 10, 15, {color: 'red', font: 1});
            if (room.terminal) room.visual.text(room.terminal.store[RESOURCE_ENERGY], 10, 16, {color: 'red', font: 1});
        }
        }
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'Attacker' && creep.memory.home == roomNumber && ((creep.ticksToLive > 215) || (creep.ticksToLive == undefined)));
        var invaders = _.filter(Game.creeps, (creep) => creep.memory.role == 'invader' && creep.memory.home == roomNumber && ((creep.ticksToLive > 415) || (creep.ticksToLive == undefined)));
        //console.log('num invaders ' + invaders.length)
        var spawnNames = Game.rooms[roomNumber].find(FIND_MY_SPAWNS);
        //if (spawnNames[0] != undefined) {
        //if (spawnNames.length > 1) {
        //if (Game.spawns[spawnNames[0].name].spawning != null) {
        // spawnNames.splice(0, 1);
        //}jkl.,bhjnm n, m,             
        //}
        //};
        if (spawnNames[0]) {
            var hostiles = Game.spawns[spawnNames[0].name].room.find(FIND_HOSTILE_CREEPS, {
                filter: function (c) {
                    return c.owner.username != 'Baldey'
                }
            });
            var hurtCreeps = Game.spawns[spawnNames[0].name].room.find(FIND_MY_CREEPS, {
                    filter: (c) => {
                    return c.hits < c.hitsMax;
        }
        })
            ;
            var myTowers = Game.spawns[spawnNames[0].name].room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER);
        }
        })
            ;
            if (hostiles.length > 0 && myTowers.length > 0) {
                for (attackTower of myTowers) {
                    attackTower.attack(hostiles[0]);
                }
            }
            ;
            var targets = Game.spawns[spawnNames[0].name].room.find(FIND_STRUCTURES, {
                filter: function (object) {
                    return object.hits < object.hitsMax * 1.0;
                }    ,
            });
            targets.sort(function (a, b) {
                return a.hits - b.hits;
            });

            if (hurtCreeps.length > 0 && myTowers.length > 0) {
                for (healTower of myTowers) {
                    if (healTower.energy > healTower.energyCapacity * .1)
                        healTower.heal(hurtCreeps[0]);
                }
            }
            ;

            if (hostiles.length == 0 && myTowers.length > 0 && Game.time % 12 == 0) {
                var i = 0;
                for (repairTower of myTowers) {

                    if (repairTower.energy > repairTower.energyCapacity * .55) {
                        repairTower.repair(targets[i ]);
                    }
                    i++;
                }
            }
            ;
        }

        if (roomNumber == 'W23N16' && Game.time % 2 == 0) {
            var observe = Game.getObjectById('599f5d092107b20fdb4f98d0');
            observe.observeRoom('W25N16');
        }
        if (roomNumber == 'W23N16' && Game.time % 2 == 1) {
            var observe = Game.getObjectById('599f5d092107b20fdb4f98d0');
            observe.observeRoom('W24N16');
        }
        if (roomNumber == 'W23N15' && Game.time % 2 == 0) {
            var observe = Game.getObjectById('59d19cdcee377f1d4f0dd820');
            observe.observeRoom('W25N15');
        }
        if (roomNumber == 'W23N15' && Game.time % 2 == 1) {
            var observe = Game.getObjectById('59d19cdcee377f1d4f0dd820');
            observe.observeRoom('W24N15');
        }
        if (spawnNames[0] && Game.time % 1 == 0) {
            console.log(roomNumber + ':' + 'SpawnNames: ' + spawnNames + ' Energy Available: ' + Game.spawns[spawnNames[0].name].room.energyAvailable + '(' + Game.spawns[spawnNames[0].name].room.energyCapacityAvailable + ')');
            for ( i in spawnNames) {
                if (Game.spawns[spawnNames[i].name].spawning != null) { 
                    var spawnedCreep = Game.spawns[spawnNames[i].name].spawning;
                    console.log(spawnNames[i].name +'-Spawning: ' + spawnedCreep.name + ' (' + spawnedCreep.remainingTime + '/' + spawnedCreep.needTime + ')');
                }
            }
            if (spawnNames) spawnNames.reverse();
            if (spawnNames.length > 1 && spawnNames[0].spawning) {
                spawnNames.splice(0,1);
            }

            if (spawnNames.length > 1 && spawnNames[0].spawning) {
                spawnNames.splice(0,1);
            }
            
            
            /*if (Game.rooms.W25N13.terminal) {
                if ((Game.rooms.W23N16.terminal && Game.rooms.W23N16.terminal.store[RESOURCE_ENERGY] > 1000) && Game.rooms.W25N13.terminal.store[RESOURCE_ENERGY] < 270000) {
                    Game.rooms.W23N16.terminal.send(RESOURCE_ENERGY, (Game.rooms.W23N16.terminal.store[RESOURCE_ENERGY] * .5), 'W25N13')
                }
                if ((Game.rooms.W23N15.terminal && Game.rooms.W23N15.terminal.store[RESOURCE_ENERGY] > 1000) && Game.rooms.W25N13.terminal.store[RESOURCE_ENERGY] < 270000) {
                    Game.rooms.W23N15.terminal.send(RESOURCE_ENERGY, (Game.rooms.W23N15.terminal.store[RESOURCE_ENERGY] * .5), 'W25N13')
                }
                if ((Game.rooms.W27N14.terminal && Game.rooms.W27N14.terminal.store[RESOURCE_ENERGY] > 1000) && Game.rooms.W25N13.terminal.store[RESOURCE_ENERGY] < 270000) {
                    Game.rooms.W27N14.terminal.send(RESOURCE_ENERGY, (Game.rooms.W27N14.terminal.store[RESOURCE_ENERGY] * .5), 'W25N13')
                }
                if ((Game.rooms.W27N16.terminal && Game.rooms.W27N16.terminal.store[RESOURCE_ENERGY] > 1000) && Game.rooms.W25N13.terminal.store[RESOURCE_ENERGY] < 270000) {
                    Game.rooms.W27N16.terminal.send(RESOURCE_ENERGY, (Game.rooms.W27N16.terminal.store[RESOURCE_ENERGY] * .5), 'W25N13')
                }
            }*/
            /*else {
                if ((Game.rooms.W27N16.terminal && Game.rooms.W23N15.terminal.store[RESOURCE_ENERGY] > 1000) && (_.sum(Game.rooms.W27N16.terminal.store) < 299000)) {
                    Game.rooms.W23N15.terminal.send(RESOURCE_ENERGY, 1000, 'W25N13')
                }
                if ((Game.rooms.W27N16.terminal && Game.rooms.W23N16.terminal.store[RESOURCE_ENERGY] > 1000) && (_.sum(Game.rooms.W27N16.terminal.store) < 299000)) {
                    Game.rooms.W23N16.terminal.send(RESOURCE_ENERGY, 1000, 'W25N13')
                }
            }*/


            var harvesters =  _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.home == roomNumber && ((creep.ticksToLive > 25) || (creep.ticksToLive == undefined)));
            //console.log('Harvesters for Room('+roomNumber+'): ' + harvesters.length);
            var dropMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'dropMiner' && creep.memory.home == roomNumber && ((creep.ticksToLive > 70) || (creep.ticksToLive == undefined)));

            //console.log('Drop Miners for Room('+roomNumber+'): ' + dropMiners.length);

            var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.home == roomNumber && ((creep.ticksToLive > 25) || (creep.ticksToLive == undefined)));
            var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.memory.home == roomNumber && ((creep.ticksToLive > 31) || (creep.ticksToLive == undefined)));
            var transports = _.sum(Game.creeps, (c) => c.memory.role == 'transport' && c.memory.targetRoom == 'W27N14' && ((c.ticksToLive > 450) || (c.tickToLive == undefined)));
            //console.log(transports);
            var buildAssists = _.sum(Game.creeps, (c) => (c.memory.role == 'builder' || c.memory.role =='upgrader' || c.memory.role == 'builder2') && c.memory.targetRoom == 'W27N14' && (c.memory.home == 'W27N14' || c.memory.home == 'W27N16')
        )
            ;
            var towerFillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerFiller' && creep.memory.home == roomNumber && ((creep.ticksToLive > 25) || (creep.ticksToLive == undefined))
        )
            ;

            var transferCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'transferCreep' && creep.memory.home == roomNumber);

            var mineralMiners = _.sum(Game.creeps, (c) => c.memory.role == 'mineralMiner' && c.memory.home == roomNumber && c.memory.targetRoom == roomNumber && ((c.ticksToLive > 85) || (c.ticksToLive == undefined)));

            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.home == roomNumber && ((creep.ticksToLive > 175) || (creep.ticksToLive == undefined))
        )
            ;
            var linkFillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkFiller' && creep.memory.home == roomNumber);
            
           
            if (harvesters.length < 1) {
                if (builder.length) {
                    builder[0].memory.role = 'harvester';
                    builder[0].memory.filling = true;
                }
                else if (linkFillers.length) {
                    linkFillers[0].memory.role = 'harvester';
                    linkFillers[0].memory.filling = true;
                }
                else if (towerFillers.length) {
                    towerFillers[0].memory.role = 'harvester';
                    towerFillers[0].memory.filling = true;
                }
            };
            var inVading = false;
            var numInvaders = 0;

            var numHarvesters = 3,
                numRepairers = 1,
                numBuilders = 1,
                numUpgraders = 0,
                numBuildAssist = 0,
                numTowerFillers = 1,
                numTransferCreeps = 1,
                numMineralMiners = 3,
                numTransports = 0;
            if (roomNumber == 'W23N16') {
                numUpgraders = 1;
                if (room.controller.ticksToDowngrade < 100001) numUpgraders = 1;
                numTransferCreeps = 1;
                numTransports = 0;
                numRepairers = 1;
                numHarvesters = 3;
            }
            if (roomNumber == 'W23N15') {
                numUpgraders = 1;
                if (room.controller.ticksToDowngrade < 100001) numUpgraders = 1;
                numTransferCreeps = 0;
                numTransports = 0;
                numRepairers = 1;
                numHarvesters = 3;
            }
            if (roomNumber == 'W27N16') {
                //if (Game.rooms[roomNumber].storage) numUpgraders = Math.floor((Game.rooms[roomNumber].storage.store[RESOURCE_ENERGY]) / 15000) + 1;
                //if (Game.rooms[roomNumber].terminal && Game.rooms[roomNumber].storage) numUpgraders = Math.floor((Game.rooms[roomNumber].storage.store[RESOURCE_ENERGY] + Game.rooms[roomNumber].terminal.store[RESOURCE_ENERGY]) / 15000) + 1;
                //if (numUpgraders > 7) numUpgraders = 7;
                numUpgraders = 1;
                numTransferCreeps = 0;
                numBuilders = 4;
                numTransports = 0;
                numBuildAssist = 0;
                numRepairers = 1;
                numHarvesters = 3;
                numMineralMiners = 2;
                if (Game.rooms.W27N14.energyCapacityAvailable < 5600) {
                    numUpgraders = 1;
                    numBuilders = 7;
                }
            }
            if (roomNumber == 'W27N14') {
                //if (Game.rooms[roomNumber].store) numUpgraders = Math.floor((Game.rooms[roomNumber].storage.store[RESOURCE_ENERGY]) / 15000) + 1;
                //if (Game.rooms[roomNumber].terminal) numUpgraders = Math.floor((Game.rooms[roomNumber].storage.store[RESOURCE_ENERGY] + Game.rooms[roomNumber].terminal.store[RESOURCE_ENERGY]) / 15000) + 1;
                //if (numUpgraders > 7) numUpgraders = 7;
                numUpgraders = 1;
                if (room.controller.ticksToDowngrade < 100001) numUpgraders = 1;
                numTransferCreeps = 0;
                numBuilders = 5;
                numTransports = 0;
                numBuildAssist = 0;
                //if (!Game.rooms.W25N13.terminal) numBuildAssist = 3;
                numRepairers = 1;
                numHarvesters = 3;
                numMineralMiners = 1;
                if (Game.rooms.W27N14.energyCapacityAvailable < 5600) {
                    numUpgraders = 1;
                    numBuilders = 7;
                }
                
            }
            if (roomNumber == 'W23N16') {
                numUpgraders = 1;
                if (room.controller.ticksToDowngrade < 100001) numUpgraders = 1;
                numTransferCreeps = 1;
                numBuilders = 1;
                numTransports = 0;
            }
            if (roomNumber == 'W25N13') {
                if (Game.rooms[roomNumber].storage) numUpgraders = Math.floor((Game.rooms[roomNumber].storage.store[RESOURCE_ENERGY]) / 15000) + 1;
                if (Game.rooms[roomNumber].terminal) numUpgraders = Math.floor((Game.rooms[roomNumber].storage.store[RESOURCE_ENERGY] + Game.rooms[roomNumber].terminal.store[RESOURCE_ENERGY]) / 15000) + 1;
                numUpgraders = 1;
                if (room.controller.ticksToDowngrade < 100001) numUpgraders = 1;
                numTransferCreeps = 0;
                numBuilders = 1;
                numTransports = 0;
                numBuildAssist = 0;
                numRepairers = 1;
                numHarvesters = 3;
                numMineralMiners = 3;
                /*if (Game.rooms.W27N14.energyCapacityAvailable < 5600) {
                    numUpgraders = 1;
                    numBuilders = 7;
                }*/
                
            }
            if (inVading == true) {
                numUpgraders = 1,
                numRepairers = 0,
                numBuilders = 0,
                numBuildAssist = 0,
                numTowerFillers = 1,
                numTransferCreeps = 0,
                numMineralMiners = 0,

                invasionRoom = '';
                if (invaders.length < numInvaders && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 4600 && roomNumber == 'W38N78') {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], ['LUCY!-' + Math.floor(Math.random() * 1000)], {
                        role: 'invader',
                        home: roomNumber,
                        targetRoom: invasionRoom,
                        engaged: false
                    });
                    console.log('Spawning new aTtAcKeR!: ' + newName);
                }


            }
            
            console.log('Ticks to Downgrade: ' + room.controller.ticksToDowngrade);
            if (dropMiners.length > 0) {
                var createHarvester =
                    function (energy) {
                        // create a balanced body as big as possible with the given energy
                        var numberOfParts = Math.floor((energy * .6) / 150);
                        // make sure the creep is not too big (more than 50 parts)
                        numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
                        var body = [];
                        //for (let i = 0; i < numberOfParts; i++) {
                        //body.push(WORK);
                        //}
                        for (let i = 0; i < (numberOfParts * 2); i++) {
                            body.push(CARRY);
                        }
                        for (let i = 0; i < numberOfParts; i++) {
                            body.push(MOVE);
                        }

                        // create creep with the created body and the given role
                        return body;
                    };
            }
            else {
                var createHarvester =
                    function (energy) {
                        // create a balanced body as big as possible with the given energy
                        var numberOfParts = Math.floor(energy * .6/ 200);
                        if (energy != 300) {
                        // make sure the creep is not too big (more than 50 parts)
                        numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
                        var body = [];
                        for (let i = 0; i < numberOfParts; i++) {
                        body.push(WORK);
                        }
                        for (let i = 0; i < numberOfParts; i++) {
                            body.push(CARRY);
                        }
                        for (let i = 0; i < numberOfParts; i++) {
                            body.push(MOVE);
                        }
                        }

                        if (energy == 300) body = [WORK, CARRY, CARRY, MOVE, MOVE];
                        // create creep with the created body and the given role
                        return body;
                        if (energy == 550) body = [WORK, CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE, MOVE, MOVE];
                        // create creep with the created body and the given role
                        return body;
                    };
            }


            if (harvesters.length < numHarvesters - 1) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([WORK,CARRY, CARRY, MOVE, MOVE], ['Miner-' + Math.floor(Math.random() * 1000)], {
                    role: 'harvester',
                    home: roomNumber,
                    classLevel: 'bootStrap'
                });
                console.log('Spawning new harvester: ' + newName);
            }
            else if ((harvesters.length < numHarvesters && harvesters.length != 0 && Game.time % 1 == 0)) {

                if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 300 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 450 && Game.spawns[spawnNames[0].name].room.energyAvailable >= 300) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep(createHarvester(Game.spawns[spawnNames[0].name].room.energyAvailable), ['Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'harvester',
                        home: roomNumber,
                        classLevel: 'normal'
                    });
                    console.log('Spawning new harvester: ' + newName);
                }
                if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 500 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 550 && Game.spawns[spawnNames[0].name].room.energyAvailable >= 400) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep(createHarvester(Game.spawns[spawnNames[0].name].room.energyAvailable), ['Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'harvester',
                        home: roomNumber
                    });
                    console.log('Spawning new harvester(3W,C,M): ' + newName);
                }
                if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 600 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 750 && Game.spawns[spawnNames[0].name].room.energyAvailable >= 500) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep(createHarvester(Game.spawns[spawnNames[0].name].room.energyAvailable), ['Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'harvester',
                        home: roomNumber
                    });
                    console.log('Spawning new harvester(3W,2C,2M): ' + newName);
                }
                if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 800 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1300 && Game.spawns[spawnNames[0].name].room.energyAvailable >= 800) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep(createHarvester(Game.spawns[spawnNames[0].name].room.energyAvailable), ['Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'harvester',
                        home: roomNumber
                    });
                    console.log('Spawning new harvester: ' + newName);
                }
                if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1350 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1800 && Game.spawns[spawnNames[0].name].room.energyAvailable >= 1000) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep(createHarvester(Game.spawns[spawnNames[0].name].room.energyAvailable), ['Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'harvester',
                        home: roomNumber
                    });
                    console.log('Spawning new harvester: ' + newName);
                }
                if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1850 && Game.spawns[spawnNames[0].name].room.energyAvailable >= 1000) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep(createHarvester(Game.spawns[spawnNames[0].name].room.energyAvailable), ['Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'harvester',
                        home: roomNumber
                    });
                    console.log('Spawning new harvester: ' + newName);
                }
            }
            else if (dropMiners.length < 2 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 550 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 750 && roomNumber != 'W33N76') {
                var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, WORK, MOVE], ['Drop Miner-' + Math.floor(Math.random() * 1000)], {
                    role: 'dropMiner',
                    home: roomNumber
                });
                console.log('Spawning new dropMiner: ' + newName);
            }
            else if (dropMiners.length < 2 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 800 && roomNumber != 'W33N76') {
                var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], ['Drop Miner-' + Math.floor(Math.random() * 1000)], {
                    role: 'dropMiner',
                    home: roomNumber
                });
                console.log('Spawning new dropMiner: ' + newName);
            }
            else if (dropMiners.length < 1 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 700 && roomNumber == 'W33N76') {
                var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], ['Drop Miner-' + Math.floor(Math.random() * 1000)], {
                    role: 'dropMiner',
                    home: roomNumber
                });
                console.log('Spawning new dropMiner: ' + newName);
            }
            else {

                var terminals = Game.spawns[spawnNames[0].name].room.find(FIND_MY_STRUCTURES, {
                        filter: function (s) {
                            return (s.structureType == STRUCTURE_TERMINAL);
                        }
                    })
                    ;
                /*var transFrom = Game.spawns[spawnNames[0].name].room.find(FIND_MY_STRUCTURES, {
                 filter: (s) => {
                 return (s.structureType == STRUCTURE_STORAGE);
                 }
                 });*/
                //console.log("numTransferCreeps: " + transferCreeps.length);
                /*if ((transferCreeps.length < numTransferCreeps) && terminals.length > 0 && (Game.rooms[roomNumber].storage.store[RESOURCE_ENERGY] > 605000) && Game.rooms[roomNumber].terminal.store[RESOURCE_ENERGY] < 250000) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], ['Transfer Creep-' + Math.floor(Math.random() * 1000)], {
                        role: 'transferCreep',
                        home: roomNumber,
                        transferFrom: Game.rooms[roomNumber].storage.id,
                        transferTo: Game.rooms[roomNumber].terminal.id
                    });
                    console.log('Spawning new transferCreep: ' + newName);
                }*/

                var conTargets = Game.spawns[spawnNames[0].name].room.find(FIND_CONSTRUCTION_SITES);
                //console.log('CPU 4: ' + Game.cpu.getUsed());
                if (builder.length < numBuilders && conTargets.length > 0 && Game.time % 1 == 0 ) {
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable == 300) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, CARRY, MOVE], ['Builder-' + Math.floor(Math.random() * 1000)], {
                            role: 'builder',
                            home: roomNumber,
                            building: false,
                            targetRoom: roomNumber
                        });
                        console.log('Spawning new builder(2W,C,M): ' + newName);
                    }
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 350 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 500) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, CARRY, MOVE, MOVE], ['Builder-' + Math.floor(Math.random() * 1000)], {
                            role: 'builder',
                            home: roomNumber,
                            building: false,
                            targetRoom: roomNumber
                        });
                        console.log('Spawning new builder(2W,C,2M): ' + newName);
                    }
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 550 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 750) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], ['Builder-' + Math.floor(Math.random() * 1000)], {
                            role: 'builder',
                            home: roomNumber,
                            building: false,
                            targetRoom: roomNumber
                        });
                        console.log('Spawning new builder(3W,2C,3M): ' + newName);
                    }
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 800 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1750) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], ['Builder-' + Math.floor(Math.random() * 1000)], {
                            role: 'builder',
                            home: roomNumber,
                            building: false,
                            targetRoom: roomNumber
                        });
                        console.log('Spawning new builder(3W,2C,3M): ' + newName);
                    }
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1800 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 4250) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Builder-' + Math.floor(Math.random() * 1000)], {
                            role: 'builder',
                            home: roomNumber,
                            building: false,
                            targetRoom: roomNumber
                        });
                        console.log('Spawning new builder(3W,2C,3M): ' + newName);
                    }
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 4300) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], ['Builder-' + Math.floor(Math.random() * 1000)], {
                            role: 'builder',
                            home: roomNumber,
                            building: false,
                            targetRoom: roomNumber
                        });
                        console.log('Spawning new builder(3W,2C,3M): ' + newName);
                    }
                }
                if (upgraders.length < numUpgraders && Game.time % 1 == 0) {
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 300 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 350 && Game.time % 5 == 0) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, CARRY, MOVE], ['Upgrader-' + Math.floor(Math.random() * 1000)], {
                            role: 'upgrader',
                            home: roomNumber
                        });
                        console.log('Spawning new upgrader(2W,C,M): ' + newName);
                    }
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 400 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 500 && Game.time % 5 == 0) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, CARRY, MOVE], ['Upgrader-' + Math.floor(Math.random() * 1000)], {
                            role: 'upgrader',
                            home: roomNumber
                        });
                        console.log('Spawning new upgrader(3W,C,1M): ' + newName);
                    }
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 550 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 750) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], ['Upgrader-' + Math.floor(Math.random() * 1000)], {
                            role: 'upgrader',
                            home: roomNumber
                        });
                        console.log('Spawning new upgrader(4W,2C,1M): ' + newName);
                    }
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 800 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1300) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], ['Upgrader-' + Math.floor(Math.random() * 1000)], {
                            role: 'upgrader',
                            home: roomNumber
                        });
                        console.log('Spawning new upgrader(6W,2C,2M): ' + newName);
                    }
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1350 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 2250) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], ['Upgrader-' + Math.floor(Math.random() * 1000)], {
                            role: 'upgrader',
                            home: roomNumber
                        });
                        console.log('Spawning new upgrader(6W,2C,2M): ' + newName);
                    }
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 2300 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable < 5600) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], ['Upgrader-' + Math.floor(Math.random() * 1000)], {
                            role: 'upgrader',
                            home: roomNumber
                        });
                        console.log('Spawning new upgrader(6W,2C,2M): ' + newName);
                    }
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable == 5600) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY], ['Upgrader-' + Math.floor(Math.random() * 1000)], {
                            role: 'upgrader',
                            home: roomNumber
                        });
                        console.log('Spawning new upgrader(6W,2C,2M): ' + newName);
                    }
                    if (Game.spawns[spawnNames[0].name].room.energyCapacityAvailable > 5600) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], ['Upgrader-' + Math.floor(Math.random() * 1000)], {
                            role: 'upgrader',
                            home: roomNumber
                        });
                        console.log('Spawning new upgrader(6W,2C,2M): ' + newName);
                    }
                }
                if ( remoteExecution == false && Game.time % 1 == 0) {

                    //  remoteMining.run(homeRoom, miningRoom, # of sources, { # of remote Miner adjustment, # of rooms away above One })
                    //  SKremoteMining.run(homeRoom, miningRoom, # of sources, { # of remote Miner adjustment, # of rooms away above One, false = Sentry needed, true = no Sentry needed for room })
                    //  negative numbers can be used in # of remote miners
                    
                    //SKMining.run('W25N13', 'W24N14', 3, 0, 0, false);
                    SKMining.run('W25N13', 'W26N14', 0, 2, 0, true);
                    SKMining.run('W25N13', 'W25N14', 3, 0, 0, false);
                    SKMining.run('W27N14', 'W26N14', 3, -2, 0, false);
                    SKMining.run('W27N14', 'W26N15', 3, 2, 0, false);
                    SKMining.run('W23N15', 'W25N15', 1, 1, -3, true);
                    SKMining.run('W23N16', 'W25N15', 1, 1, -3, true);
                    SKMining.run('W27N16', 'W25N15', 1, 1, -2, false);
                    SKMining.run('W23N16', 'W24N16', 3, 0, 0, false);
                    SKMining.run('W23N16', 'W25N16', 0, 2, 0, false);
                    SKMining.run('W23N15', 'W25N16', 3, 0, 0, true);
                    SKMining.run('W27N16', 'W26N16', 3, -1, 0, false);
                    //SKMining.run('W23N16', 'W23N15', 0, 0, false);
                    //SKMining.run('W23N15', 'W25N15', 3, 0, true);
                    SKMining.run('W23N15', 'W24N15', 3, -1, 0, false);
                    remoteMining.run('W25N13', 'W26N13', 2, -2, 0);
                    remoteMining.run('W23N16', 'W23N17', 2, -2, 0);
                    remoteMining.run('W23N16', 'W22N16', 1, -1, 0);
                    remoteMining.run('W27N16', 'W28N16', 1, -1, 0);
                    remoteMining.run('W27N16', 'W27N17', 2, -2, 0);
                    remoteMining.run('W27N14', 'W27N15', 1, -1, 0);
                    remoteMining.run('W27N14', 'W28N14', 2, -3, 0);
                    //remoteMining.run('W23N16', 'W23N15', 2, -2, 0);
                    

                    remoteExecution = true;
                    //console.log('ATTAckers!!!! : ' + attackers.length);
                    var roomTarget = 'W38N76';
                }
                if (transports < numTransports && Game.rooms.W27N16.storage.store[RESOURCE_ENERGY] > 100000) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Tansport-' + Math.floor(Math.random() * 1000)], {
                        role: 'transport',
                        home: 'W27N16',
                        targetRoom: 'W27N14',
                        transferFrom: '5a1fa6af2a835c27d81a4ae8',
                        transferTo: '5a20a1d4a458c71ca8a87047',
                        harvesting: true,
                        resource: RESOURCE_ENERGY,
                        waypoint: false
                    });
                    console.log("Making TransPort!!! " + newName + ' '  + (transports + 1) + ' of ' + numTransports)
                }
                var targets = Game.spawns[spawnNames[0].name].room.find(FIND_CONSTRUCTION_SITES);
                var neededBuilders = (1 + Math.min((Math.floor(targets.length / 4)), 3));


                if (repairers.length < numRepairers && Game.time % 2 == 0 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 1100) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], ['Repairer-' + Math.floor(Math.random() * 1000)], {
                        role: 'repairer',
                        home: roomNumber,
                        target: undefined
                    });
                    console.log('Spawning new repairer: ' + newName);
                }
                if (repairers.length < numRepairers && Game.time % 2 == 0 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 1150) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], ['Repairer-' + Math.floor(Math.random() * 1000)], {
                        role: 'repairer',
                        home: roomNumber,
                        target: undefined
                    });
                    console.log('Spawning new repairer: ' + newName);
                }
                if (repairers.length < numRepairers && Game.time % 2 == 0 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 15000) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Repairer-' + Math.floor(Math.random() * 1000)], {
                        role: 'repairer',
                        home: roomNumber,
                        target: undefined
                    });
                    console.log('Spawning new repairer: ' + newName);
                }

                if (towerFillers.length < numTowerFillers && myTowers.length > 0 && Game.time % 1 == 0) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], ['TowerFiller-' + Math.floor(Math.random() * 1000)], {
                        role: 'towerFiller',
                        home: roomNumber
                    });
                    console.log('Spawning new towerFiller: ' + newName);
                }
                //console.log('TRANSPORTS: ' + transports);
                
                var targetRoomCheck = 'W25N13';
                
                if (!Game.rooms.W25N13 && buildAssists < numBuildAssist && roomNumber == 'W27N14' && Game.getObjectById('5a20a1d4a458c71ca8a87047').store[RESOURCE_ENERGY] > 0) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Building Assistant-' + Math.floor(Math.random() * 1000)], {
                        role: 'builder2',
                        home: 'W27N14',
                        targetRoom: 'W25N13',
                        transferFrom: '5a20a1d4a458c71ca8a87047',
                        transferTo: '59c2f92d7cee7802b78159eb',
                        harvesting: true,
                        waypoint: false
                    });
                    console.log("Making Build Asister!!! " + newName + ' ' + (buildAssists + 1) + ' of ' + numBuildAssist)
                }
                else if (Game.rooms.W25N13 && buildAssists < numBuildAssist && roomNumber == 'W27N14' && Game.getObjectById('5a20a1d4a458c71ca8a87047').store[RESOURCE_ENERGY] > 0) {
                        var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Building Assistant-' + Math.floor(Math.random() * 1000)], {
                        role: 'builder2',
                        home: 'W27N14',
                        targetRoom: 'W25N13',
                        transferFrom: '5a20a1d4a458c71ca8a87047',
                        transferTo: '59c2f92d7cee7802b78159eb',
                        harvesting: true,
                        waypoint: false
                    });
                    console.log("Making Build Asister!!! " + newName + ' ' + (buildAssists + 1) + ' of ' + numBuildAssist)
                }
                ; 
                /*if (buildAssists < numBuildAssist && (roomNumber == 'W39N75' || roomNumber == 'W38N76' && Game.getObjectById('584ee805a2e9b4444d73a005').energy > 300000)) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Building Assistant-' + Math.floor(Math.random() * 1000)], {
                        role: 'builder',
                        home: 'W38N78',
                        targetRoom: 'W33N76',
                        transferFrom: '5873524888fdd9913424a12c',
                        transferTo: '58914879b3bfa4ec25c4d0dd',
                        harvesting: true,
                        waypoint: false
                    });
                    console.log("Making Build Assiter!!! " + newName + ' ' + (buildAssists + 1) + ' of ' + numBuildAssist)
                }
                ;*/
                var extractors = Game.spawns[spawnNames[0].name].room.find(FIND_MY_STRUCTURES, {
                                        filter: function (s) {
                                            return (s.structureType == STRUCTURE_EXTRACTOR);
                                        }
                                    })
                                    ;
                var minerals = [];
                var minerals = Game.spawns[spawnNames[0].name].room.find(FIND_MINERALS);
                if (minerals[0].mineralType == "H" ) var minType = 'RESOURCE_HYDROGEN';
                if (minerals[0].mineralType == "O" ) var minType = 'RESOURCE_OXYGEN';
                if (minerals[0].mineralType == "X" ) var minType = 'RESOURCE_CATALYST';
                //console.log('Mineral: ' + minerals[0])
                //console.log('MINERALMINERS(' + roomNumber + '): ' + mineralMiners);
                if (mineralMiners < numMineralMiners && Game.rooms[roomNumber].terminal && (Game.rooms[roomNumber].terminal.store[minType] < 100000 || !Game.rooms[roomNumber].terminal.store[minType])   && minerals[0].mineralAmount > 0 &&  Game.spawns[spawnNames[0].name].room.controller.level == 6) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Mineral Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'mineralMiner',
                        home: roomNumber,
                        targetRoom: roomNumber
                    });
                    console.log('Spawning new mineralMiner: ' + newName);
                }
                if( Game.rooms[roomNumber].terminal ) console.log('Type: ' + minType);
                if( Game.rooms[roomNumber].terminal && Game.rooms[roomNumber].terminal.store[minType] > 0) console.log('Amount in Terminal: ' + Game.rooms[roomNumber].terminal.store[minType])
                if (mineralMiners < numMineralMiners && Game.rooms[roomNumber].terminal && (Game.rooms[roomNumber].terminal.store[minType] < 100000 || !Game.rooms[roomNumber].terminal.store[minType])   && minerals[0].mineralAmount > 0 && Game.spawns[spawnNames[0].name].room.controller.level >= 7) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], ['Mineral Miner-' + Math.floor(Math.random() * 1000)], {
                        role: 'mineralMiner',
                        home: roomNumber,
                        targetRoom: roomNumber
                    });
                    console.log('Spawning new mineralMiner: ' + newName);
                }
            }
            
            LinkLogic.run();
                if (attackers.length < 0 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 2300 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable  > 2300 ) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, MOVE, MOVE, HEAL, HEAL, HEAL, MOVE, RANGED_ATTACK, RANGED_ATTACK, ATTACK, RANGED_ATTACK, RANGED_ATTACK], ['LUCY!-' + Math.floor(Math.random() * 1000)], {
                        role: 'Attacker',
                        home: roomNumber,
                        targetRoom: roomNumber,
                        engaged: false
                    });
                    console.log('Spawning new aTtAcKeR!: ' + newName);
                }
                if (attackers.length < 0 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable <= 2300) {
                    var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL], ['LUCY!-' + Math.floor(Math.random() * 1000)], {
                        role: 'Attacker',
                        home: roomNumber,
                        targetRoom: roomNumber,
                        engaged: false
                    });
                    console.log('Spawning new aTtAcKeR!: ' + newName);
                }
            if (attackers.length < 0 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable > 2300 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable < 4600) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL], ['LUCY!-' + Math.floor(Math.random() * 1000)], {
                    role: 'Attacker',
                    home: roomNumber,
                    targetRoom: roomNumber,
                    engaged: false
                });
                console.log('Spawning new aTtAcKeR!: ' + newName);
            }
            if (attackers.length < 0 && Game.spawns[spawnNames[0].name].room.energyCapacityAvailable >= 4600) {
                var newName = Game.spawns[spawnNames[0].name].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], ['LUCY!-' + Math.floor(Math.random() * 1000)], {
                    role: 'Attacker',
                    home: roomNumber,
                    targetRoom: roomNumber,
                    engaged: false
                });
                console.log('Spawning new aTtAcKeR!: ' + newName);
            }

        if ( roomNumber == 'W25N13') {
             var numExtensions = Game.spawns.Spawn13.room.find(FIND_MY_STRUCTURES, {
             filter: (s) => {
             return s.structureType == STRUCTURE_EXTENSION;
             }
             });
             var extConSites = Game.spawns.Spawn13.room.find(FIND_MY_CONSTRUCTION_SITES, {
             filter: (s) => {
             return s.structureType == STRUCTURE_EXTENSION;
             }
             });
            var numStorage = Game.spawns.Spawn13.room.find(FIND_MY_STRUCTURES, {
                    filter: (s) => {
                    return s.structureType == STRUCTURE_STORAGE;
        }
        });
            var extStorageConSites = Game.spawns.Spawn13.room.find(FIND_MY_CONSTRUCTION_SITES, {
                    filter: (s) => {
                    return s.structureType == STRUCTURE_STORAGE;
        }
        });
        
        }
             //console.log('Extension: ' + numExtensions.length + ' ' + extConSites.length);

            if (roomNumber == 'W25N13' && Game.rooms['W25N13'].controller.level >= 3 && numExtensions.length + extConSites.length < 10) {
                Game.rooms.W25N13.createConstructionSite(39,7,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(38,8,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(37,9,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(36,10,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(35,11,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(21,39,STRUCTURE_TOWER);
            }
            if (roomNumber == 'W25N13' && Game.rooms['W25N13'].controller.level == 4 && numExtensions.length + extConSites.length < 20) {
                Game.rooms.W25N13.createConstructionSite(21,29,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(23,28,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(24,28,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(24,27,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(25,26,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(25,27,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(26,26,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(26,25,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(27,25,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(27,24,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(13,36,STRUCTURE_STORAGE);
            }
            if (roomNumber == 'W25N13' && Game.rooms['W25N13'].controller.level == 5 && numExtensions.length + extConSites.length < 30) {
                Game.rooms.W25N13.createConstructionSite(33,13,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(33,12,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(34,12,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(34,11,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(35,11,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(39,6,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(38,7,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(37,8,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(36,9,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(35,10,STRUCTURE_EXTENSION);
                Game.rooms.W25N13.createConstructionSite(33,8,STRUCTURE_TOWER);
                Game.rooms.W25N13.createConstructionSite(15,36,STRUCTURE_LINK);
                Game.rooms.W25N13.createConstructionSite(35,3,STRUCTURE_LINK);
            }
            if (roomNumber == 'W27N14' && Game.rooms['W27N14'].controller.level == 6 && numExtensions.length + extConSites.length < 40) {
                Game.rooms.W27N14.createConstructionSite(25,8,STRUCTURE_TERMINAL);
                Game.rooms.W27N14.createConstructionSite(20,12,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(21,12,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(22,12,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(23,12,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(24,12,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(25,12,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(26,12,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(28,24,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(28,25,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(28,26,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(12,18,STRUCTURE_EXTRACTOR);
                Game.rooms.W27N14.createConstructionSite(46,3,STRUCTURE_LINK);
            }
            if (roomNumber == 'W25N13' && Game.rooms['W25N13'].controller.level == 7 && numExtensions.length + extConSites.length < 50) {
                Game.rooms.W27N14.createConstructionSite(30,24,STRUCTURE_SPAWN);
                Game.rooms.W27N14.createConstructionSite(25,15,STRUCTURE_TOWER);
                Game.rooms.W27N14.createConstructionSite(29,27,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(29,28,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(28,28,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(28,29,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(27,29,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(27,30,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(26,30,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(26,31,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(25,31,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(25,32,STRUCTURE_EXTENSION);
                Game.rooms.W27N14.createConstructionSite(35,4,STRUCTURE_LINK);
            }
        }
    }

    console.log('CPU: ' + Game.cpu.getUsed());

}

