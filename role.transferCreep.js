/**
 * Created by Andy on 12/28/2016.
 */
var roletransferCreep = {

    /* Creep role, transfer commodity between vessels */
    run: function(creep) {
        /*var transTo = creep.room.find(FIND_MY_STRUCTURES, {
            filter: function(s) {
                return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity;
            }
        });*/
        //Game.spawns.Spawn1.recycleCreep(creep);
        var transFrom = Game.getObjectById(creep.memory.transferFrom);
        var transTo = Game.getObjectById(creep.memory.transferTo);
        var scanLinks = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => {
                return s.structureType == STRUCTURE_LINK && s.energy > 0
            }
        })
        var fullLinks = creep.pos.findInRange(scanLinks, 5);
        if (fullLinks.length > 0) {
            transFrom = fullLinks[0];
        }
        //console.log('Transfer Target: ' + transFrom);
        //console.log('Transfer Vessle: ' + transTo)
        /*if (!transTo.length) {
            var transTo = creep.room.find(FIND_STRUCTURES, {
                filter: function(s) {
                    return (s.structureType == STRUCTURE_STORAGE);
                }
            })
        };*/
        /*if (transTo.length) {
            transTo.sort(function(a,b) {
                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
            });
        }*/
        //console.log('Transfer VessleTwo!: ' + transTo)
        /*var transFrom = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (s) => {
                return (s.structureType == STRUCTURE_TERMINAL);
                }
        });*/
        if(creep.memory.harvesting && _.sum(creep.carry) >= creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('Transfering');
        }
        if (!(creep.memory.harvesting) && _.sum(creep.carry) == 0) {
            creep.memory.harvesting = true;
            creep.say('Harvesting');
        }
        if(creep.memory.harvesting == false && _.sum(transTo.store) < 295000) {
            if(creep.transfer(transTo, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                creep.moveTo(transTo);
            }
        }
        else
            {
            if (creep.withdraw(transFrom, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                creep.moveTo(transFrom);
            }
        }
    }

};

module.exports = roletransferCreep;