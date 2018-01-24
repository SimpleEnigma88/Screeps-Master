var linkLogic = {
    run: function () {
       
        //Room: W23N16
        var link1 = Game.getObjectById('59bfc33d93c8455aefd62ed7');
        var link2 = Game.getObjectById('598f7944fe7b7c616c238877');
        var link3 = Game.getObjectById('59e1bdfca667152e9a52e162');
        var link4 = Game.getObjectById('59bfc5ce829d8423692e3366');
        var link5 = Game.getObjectById('59bfea3627e3e449314d3e29');
        var link6 = Game.getObjectById('59ad9a666ee546776038b219');
        var links = [link1, link3, link2, link4, link5];
        var linkMode = 'sendTerminal'; 
        var spawnNames = Game.rooms.W23N16.find(FIND_MY_SPAWNS);
        if (spawnNames) spawnNames.reverse();
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        
        for (i in links) {
            if((links[i].energy > 200 && links[i].cooldown < 1) && (link6.energy < link6.energyCapacity * .45)) {
                links[i].transferEnergy(link6);
                break;
            }
        }
        var linkFillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkFiller'  && creep.memory.mode == 'conserve' && creep.memory.home == 'W23N16' && ((creep.spawning) || (creep.ticksToLive > 70))
        )
        ;
        /*var linkFillers2 = _.filter(Game.spawns.Spawn1.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'linkFiller' && creep.memory.mode == 'upgradeController' && creep.memory.home == 'W23N16' && (creep.ticksToLive > 150) || (creep.spawning == true)
        )
        ;*/
        var myLinks = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
    }
    })
        ;
        if (linkFillers.length < 1 && myLinks.length > 0 && Game.spawns[spawnNames[0].name].room.storage) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], ['linkFiller - ' + Math.floor(Math.random() * 1000)], {
                role: 'linkFiller',
                home: 'W23N16',
                targetLink: '599f9f760ba209299f6cd347',
                targetLink2: '59ad9a666ee546776038b219',
                mode: 'conserve'
            });
            console.log('Spawning new linkFiller: ' + newName);
        }
        
        /*if (linkFillers2.length < 1 && myLinks.length > 0) {
            var newName = Game.spawns.Spawn3.createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], ['linkFiller - ' + Math.floor(Math.random() * 1000)], {
                role: 'linkFiller',
                home: 'W23N16',
                targetLink: '598f7944fe7b7c616c238877',
                targetLink2: '599f82254b45160403cd4f52',
                mode: 'upgradeController'
            });
            console.log('Spawning new linkFiller: ' + newName);
        }*/
        
        //W23N15
        var linkA1 = Game.getObjectById('59e0edf2ad308e519fd9fb39');
        var linkA2 = Game.getObjectById('5a58572f29edc826c078a334');
        var linkA3 = Game.getObjectById('59cc9aefa5de5857be9daa56');
        var linkA4 = Game.getObjectById('59cca155bb2ee1574bdeea39');
        var linkA5 = Game.getObjectById('59d15f79f39551212804eed1');
        var linkA6 = Game.getObjectById('59d3b1200d9cfa4c44c9c6a1');
        var linksA = [linkA1, linkA3, linkA2, linkA4, linkA5];
        var linkMode = 'sendTerminal'; 
        var spawnNames = Game.rooms.W23N15.find(FIND_MY_SPAWNS);
        if (spawnNames) spawnNames.reverse();
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        
        for (i in linksA) {
            if((linksA[i].energy > 200 && linksA[i].cooldown < 1) && (linkA6.energy < linkA6.energyCapacity * .15)) {
                linksA[i].transferEnergy(linkA6);
                break;
            }
        }/*
        for (i in linksA) {
            if((linksA[i].energy > 200 && linksA[i].cooldown < 1) && (linkA2.energy < linkA2.energyCapacity * .150)) {
                linksA[i].transferEnergy(linkA2);
                break;
            }
        }*/
        var linkFillersA = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkFiller' && creep.memory.home == 'W23N15' && ((creep.spawning) || (creep.ticksToLive > 70))
        )
        ;
        /*var linkFillersA2 = _.filter(Game.spawns.Spawn1.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'linkFiller' && creep.memory.mode == 'upgradeController' && creep.memory.home == 'W23N16' && (creep.ticksToLive > 150) || (creep.spawning == true)
        )
        ;*/
        var myLinksA = Game.spawns[spawnNames[0].name].room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
    }
    })
        ;
        if (linkFillersA.length < 1 && myLinksA.length > 0 && Game.spawns[spawnNames[0].name].room.storage) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], ['linkFiller - ' + Math.floor(Math.random() * 1000)], {
                role: 'linkFiller',
                home: 'W23N15',
                targetLink2: '59d3b1200d9cfa4c44c9c6a1',
                targetLink: '59d3af1291578e5ec2b5ea63',
                mode: 'conserve'
            });
            console.log('Spawning new linkFiller: ' + newName);
        }
        
        /*if (linkFillers2.length < 1 && myLinks.length > 0) {
            var newName = Game.spawns.Spawn3.createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], ['linkFiller - ' + Math.floor(Math.random() * 1000)], {
                role: 'linkFiller',
                home: 'W23N16',
                targetLink: '598f7944fe7b7c616c238877',
                targetLink2: '599f82254b45160403cd4f52',
                mode: 'upgradeController'
            });
            console.log('Spawning new linkFiller: ' + newName);
        }*/
        
        //Room: W27N16
        var linkB1 = Game.getObjectById('5a24c327cb10a00397770f09');
        var linkB2 = Game.getObjectById('5a1b6bb6023028272d8a433d');
        var linkB3 = Game.getObjectById('5a13d1369f31fc7ad08ee7ca');
        var linkB4 = Game.getObjectById('5a172ac019ab297b33b5a4e3');
        var linkB5 = Game.getObjectById('5a1b6b15f3bd5076ef9525d7');
        var linkB6 = Game.getObjectById('5a1dfacc7ed2bd241626bab6');
        var links = [linkB1, linkB3, linkB2, linkB4, linkB5, linkB6];
        var linkMode = 'sendTerminal'; 
        var spawnNames = Game.rooms.W27N16.find(FIND_MY_SPAWNS);
        if (spawnNames) spawnNames.reverse();
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        
        
        for (i in links) {
            if((links[i].energy > 200 && links[i].cooldown < 1) && (linkB1.energy < linkB1.energyCapacity * .45)) {
                links[i].transferEnergy(linkB1);
                break;
            }
        }
        var linkFillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkFiller'  && creep.memory.mode == 'conserve' && creep.memory.home == 'W27N16' && ((creep.spawning) || (creep.ticksToLive > 70))
        )
        ;
        /*var linkFillers2 = _.filter(Game.spawns.Spawn1.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'linkFiller' && creep.memory.mode == 'upgradeController' && creep.memory.home == 'W23N16' && (creep.ticksToLive > 150) || (creep.spawning == true)
        )
        ;*/
        var myLinks = Game.spawns[spawnNames[0].name].room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
    }
    })
        ;
        console.log('Teststs: ' + linkFillers)
        if (linkFillers.length < 1 && myLinks.length > 0 && Game.spawns[spawnNames[0].name].room.storage) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], ['linkFiller - ' + Math.floor(Math.random() * 1000)], {
                role: 'linkFiller',
                home: 'W27N16',
                targetLink: '5a24c327cb10a00397770f09',
                targetLink2: '',
                mode: 'conserve'
            });
            console.log('Spawning new linkFiller: ' + newName);
        }
        
        /*if (linkFillers2.length < 1 && myLinks.length > 0) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], ['linkFiller - ' + Math.floor(Math.random() * 1000)], {
                role: 'linkFiller',
                home: 'W23N16',
                targetLink: '598f7944fe7b7c616c238877',
                targetLink2: '599f82254b45160403cd4f52',
                mode: 'upgradeController'
            });
            console.log('Spawning new linkFiller: ' + newName);
        }*/
    
    //Room: W27N14
        var link1 = Game.getObjectById('5a21c269c8e683523b60b2b1');
        var link2 = Game.getObjectById('5a239a4e2413213069f51ec6');
        var link3 = Game.getObjectById('5a25d51c2b92bc1c8b3bfead');
        var link4 = Game.getObjectById('5a2c6302001c1a29baa2a558');
        var link5 = Game.getObjectById('5a28c7f49ab8bd3324aaadc0');
        var link6 = Game.getObjectById('5a21b9f619e54c0f53a2b07b');
        var links = [link1, link3, link2, link4, link5];
        var linkMode = 'sendTerminal'; 
        var spawnNames = Game.rooms.W27N14.find(FIND_MY_SPAWNS);
        if (spawnNames) spawnNames.reverse();
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        
        for (i in links) {
            if((links[i].energy > 200 && links[i].cooldown < 1) && (link6.energy < link6.energyCapacity * .45)) {
                links[i].transferEnergy(link6);
                break;
            }
        }
        var linkFillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkFiller'  && creep.memory.mode == 'conserve' && creep.memory.home == 'W27N14' && ((creep.spawning) || (creep.ticksToLive > 70))
        )
        ;
        /*var linkFillers2 = _.filter(Game.spawns.Spawn1.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'linkFiller' && creep.memory.mode == 'upgradeController' && creep.memory.home == 'W23N16' && (creep.ticksToLive > 150) || (creep.spawning == true)
        )
        ;*/
        var myLinks = Game.spawns[spawnNames[0].name].room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
    }
    })
        ;
        if (linkFillers.length < 1 && myLinks.length > 0 && Game.spawns[spawnNames[0].name].room.storage) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], ['linkFiller - ' + Math.floor(Math.random() * 1000)], {
                role: 'linkFiller',
                home: 'W27N14',
                targetLink: '5a21b9f619e54c0f53a2b07b',
                targetLink2: '',
                mode: 'conserve'
            });
            console.log('Spawning new linkFiller: ' + newName);
        }
        
        /*if (linkFillers2.length < 1 && myLinks.length > 0) {
            var newName = Game.spawns.Spawn3.createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], ['linkFiller - ' + Math.floor(Math.random() * 1000)], {
                role: 'linkFiller',
                home: 'W27N14',
                targetLink: '',
                targetLink2: '',
                mode: 'upgradeController'
            });
            console.log('Spawning new linkFiller: ' + newName);
        }*/
        //Room: W25N13
        var link1 = Game.getObjectById('5a30a2a7c84e1a2b7cc87552');
        var link2 = Game.getObjectById('5a2cfc518fac190ad65f4819');
        var link3 = Game.getObjectById('5a344e1203e5e75895f627cc');
        var link4 = Game.getObjectById('5a36e53bf2c7350e740ff6b0');
        var link5 = Game.getObjectById('5a36e555f9f1520e887bc7c4');
        var link6 = Game.getObjectById('5a2cf7c88af8bd2ca4ce938b');
        var links = [link1, link3, link2, link4, link5];
        var linkMode = 'sendTerminal'; 
        var spawnNames = Game.rooms.W25N13.find(FIND_MY_SPAWNS);
        if (spawnNames) spawnNames.reverse();
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        if (spawnNames.length > 1 && spawnNames[0].spawning) {
            spawnNames.splice(0,1);
        }
        
        for (i in links) {
            if((links[i].energy > 200 && links[i].cooldown < 1) && (link6.energy < link6.energyCapacity * .45)) {
                links[i].transferEnergy(link6);
                break;
            }
        }
        var linkFillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkFiller'  && creep.memory.mode == 'conserve' && creep.memory.home == 'W25N13' && ((creep.spawning) || (creep.ticksToLive > 70))
        )
        ;
        /*var linkFillers2 = _.filter(Game.spawns.Spawn1.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'linkFiller' && creep.memory.mode == 'upgradeController' && creep.memory.home == 'W25N13' && (creep.ticksToLive > 150) || (creep.spawning == true)
        )
        ;*/
        var myLinks = Game.spawns[spawnNames[0].name].room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
    }
    })
        ;
        if (linkFillers.length < 1 && myLinks.length > 0 && Game.spawns[spawnNames[0].name].room.storage) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], ['linkFiller - ' + Math.floor(Math.random() * 1000)], {
                role: 'linkFiller',
                home: 'W25N13',
                targetLink: '5a2cf7c88af8bd2ca4ce938b',
                targetLink2: '',
                mode: 'conserve'
            });
            console.log('Spawning new linkFiller: ' + newName);
        }
        
        /*if (linkFillers2.length < 1 && myLinks.length > 0) {
            var newName = Game.spawns[spawnNames[0].name].createCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], ['linkFiller - ' + Math.floor(Math.random() * 1000)], {
                role: 'linkFiller',
                home: 'W25N13',
                targetLink: '',
                targetLink2: '',
                mode: 'upgradeController'
            });
            console.log('Spawning new linkFiller: ' + newName);
        }*/
    }
};

module.exports = linkLogic;