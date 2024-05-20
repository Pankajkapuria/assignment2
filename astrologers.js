// Astrologer class
class Astrologer {
    constructor(id, name, isTopAstrologer) {
        this.id = id;
        this.name = name;
        this.isTopAstrologer = isTopAstrologer;
        this.currentFlow = 0;
        this.FlowStatus = 0;
    }
}

// User class
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class FlowDistribution {

    constructor(astrologers) {
        this.astrologers = astrologers
        this.index = 0
    }

    getNextAstrologer() {
        if (this.astrologers.length === 0) return null;
        // Round-robin selection

        let astrologer = this.astrologers[this.index];
        if (astrologer.FlowStatus > 0) {
            this.astrologers[this.index].FlowStatus--;
        }
        else if (astrologer.flowStatus < 0) {
            this.astrologers[this.index].FlowStatus++;
            this.index = (this.index + 1) % this.astrologers.length;
            astrologer = this.astrologers[this.index]
        }
        else {
            this.index = (this.index + 1) % this.astrologers.length;
        }
        return astrologer;
    }

    distributeUser(user) {
        const astrologer = this.getNextAstrologer();
        if (astrologer) {
            astrologer.currentFlow += 1;
            return astrologer
        }
    }

    adjustFlowForTopAstrologers(id, newFlowStatus) {
        this.astrologers.forEach(astrologer => {

            if (astrologer.id === id && astrologer.isTopAstrologer) {
                astrologer.FlowStatus = newFlowStatus;
                return;
            }
        });
    }

}

module.exports = { Astrologer, User, FlowDistribution }