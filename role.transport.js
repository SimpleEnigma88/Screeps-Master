/**
 * Created by Andy on 1/15/2017.
 */

var roletransport = {

    /* Creep role, transfer commodity between vessels */
    run: function(creep) {
        var availableAttackers = _.filter(Game.creeps, (c) => c.memory.role == 'Attacker' && c.memory.engaged == false);
        //console.log('Available AttackeRs: ' + availableAttackers);

        var hostileCreepers = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function(c) {
                return c.owner.username != 'Baldey';
            }
        });
        if(hostileCreepers.length > 0) {
            for (i in availableAttackers) {
                availableAttackers[i].memory.targetRoom = creep.room.name;

            }
        }
        var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES , {
            filter: function(e) {
                return e.amount > 50;
            }
        });
        var transFrom = Game.getObjectById(creep.memory.transferFrom);
        /*var transTo = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            (structure.energy < structure.energyCapacity * .7);
                    }
            });*/
        if (transTo == undefined) {
            var transTo = Game.getObjectById(creep.memory.transferTo);
        }
        //console.log('Transfer Target: ' + transTo);
        //console.log('Transfer Vessle: ' + transTo)
        if (creep.pos.getRangeTo(droppedEnergy) < 5 && _.sum(creep.carry) < creep.carryCapacity) {
            if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedEnergy, {reusePath: 5});
            }
        }
        else {
            if (creep.memory.harvesting && _.sum(creep.carry) >= creep.carryCapacity) {
                creep.memory.harvesting = false;
                creep.say('Transfering');
            }
            if (!(creep.memory.harvesting) && _.sum(creep.carry) == 0) {
                creep.memory.harvesting = true;
                creep.say('Harvesting');
            }
            if (creep.memory.harvesting == false) {
                if (creep.room.name != creep.memory.targetRoom) {
                    var exit = creep.room.findExitTo(creep.memory.targetRoom);
                    creep.moveTo(creep.pos.findClosestByRange(exit), {reusePath: 5});
                }
                else {
                    if (1==0) {
                        creep.moveTo(Game.getObjectById('58d6619a7ac5673a4d757835'));
                    }
                    else {
                        for (var resourceType in creep.carry) {
                            if (creep.transfer(transTo, resourceType) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(transTo, {reusePath: 5});
                            }
                        }
                    }
                }
            }
            else {
                if (creep.room.name != creep.memory.home) {
                    var exit = creep.room.findExitTo(creep.memory.home);
                    creep.moveTo(creep.pos.findClosestByRange(exit), {reusePath: 5});
                }
                else {
                    if (creep.withdraw(transFrom, creep.memory.resource) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(transFrom, {reusePath: 5});
                    }
                }
            }
        }
    }
};

module.exports = roletransport;