var roleClaimer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var hostileCreepers = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function(c) {
                return c.owner.username != 'Baldey' && creep.pos.getRangeTo(c) < 7;
            }
        });
        if (creep.memory.targetRoomHostile > 0 ) creep.memory.targetRoomHostile -= 1;
        if(hostileCreepers.length > 0 && creep.room.name != creep.memory.home) {
            var availableAttackers = _.filter(Game.creeps, (c) => c.memory.role == 'Attacker' && c.memory.engaged == false && c.memory.home == creep.memory.home);
            //console.log('Available AttackeRs: ' + availableAttackers);

            creep.memory.targetRoomHostile = 30;
            for (var i in availableAttackers) {
                availableAttackers[i].memory.targetRoom = creep.room.name;

            }
        }
        if(creep.room.name != creep.memory.home && creep.memory.targetRoomHostile > 0) {
            var exit = creep.room.findExitTo(creep.memory.home);
            creep.moveTo(creep.pos.findClosestByRange(exit), {reusePath: 15, maxRooms: 1});
        }
        else if (creep.room.name == creep.memory.home && creep.memory.targetRoomHostile > 0) {
            creep.moveTo(25,25);
        }
        else if (creep.memory.targetRoomHostile > 0) {
        }
        else if(creep.room.name != creep.memory.targetRoom) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit), {reusePath: 15, maxRooms: 1});
        }
        else {
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {reusePath: 15, maxRooms: 1});
            }
        }
        if (((creep.pos.x == 0 || creep.pos.x == 49) || (creep.pos.y == 0 || creep.pos.x ==49))) creep.moveTo(25,25);
    }
}

module.exports = roleClaimer;