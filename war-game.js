// Plan:
// Make a deck of 52 cards (4 suits x 13 ranks)
// Shuffle the deck
// Deal 26 cards to Player 1 and 26 cards to Player 2
// Play 26 rounds:
//  Each player plays 1 card
//  Higher card = +1 point
//  If Tie = 0 points for both
// Log the round details (cards, winner, score)
// After all rounds, print final score + winner or tie
//
// STEP 1: Create a Card class: suit, rank, value
// STEP 2: Create a Deck class: array of 52 cards, shuffle method, deal method
// STEP 3: Create a Player class: name, hand (array of cards), score
// STEP 4: Create a Game class: players, deck, play method
// STEP 5: Run the game and log print results

// This array is our "list of suits" so we can reuse it when building the deck
let cardSuits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];
console.log("Card Suits Example:", cardSuits);

// STEP 1: Create a Card class: suit, rank, value
// This class creates individual cards
class Card {
    // We use a constructor so every Card is created the same way
    constructor(suit, value) {
        this.suit = suit;      // Save the suit to this card (Hearts/Spades/Diamonds/Clubs)
        this.value = value;    // Save the value (2, 3, 4... J, Q, K, A) to this card
    }

        // We use an object as a "lookup table" to convert card letters into numbers
        // This makes comparing cards easy (numbers are easier to compare than "K" vs "9")
    getRank() {
        const ranks = {
            "2": 2,      // A 2 is worth 2
            "3": 3,      // A 3 is worth 3
            "4": 4,      // And so on...
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "10": 10,
            "J": 11,     // Jack is worth 11
            "Q": 12,     // Queen is worth 12
            "K": 13,     // King is worth 13
            "A": 14,      // Ace is worth 14 (the strongest)
        };
        // We use this.value as the key to get the number rank from the ranks object
        return ranks[this.value];
    }

    // This template string makes it easy to build a readable message
    toString() {
        return `${this.value} of ${this.suit}`;
    }
}

// STEP 2: Create a Deck class: array of 52 cards, shuffle method, deal method
class Deck {
    // The constructor creates a brand new deck when we start the game
    constructor() {
        this.cards = [];      // Start with an empty array of cards
        this.createDeck();    // Fill it with 52 cards
        this.shuffle();       // shuffle right away so the game is random
    }

    // This method creates all 52 cards
    createDeck() {
        // We store card values in an array so we can loop through them
        const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

        // For EACH suit in our cardSuits list
        for (let suit of cardSuits) {
            // For EACH value in our values list
            for (let value of values) {
                // Create a new Card and add it to our deck
                this.cards.push(new Card(suit, value));
            }
        }
        // Now we have 4 suits × 13 values = 52 cards total
    }

    // Used the Fisher Yates shuffle method: a common way to shuffle fairly
    shuffle() {
        // Go through each card in the deck
        for (let i = this.cards.length - 1; i > 0; i--) {
            // Pick a random card position
            const randomIndex = Math.floor(Math.random() * (i + 1));
            // Swap the current card with the random card
            [this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]];
        }
        // The deck is now shuffled!
    }

    // This method gives half the deck to each player
    deal() {
        // splice(0, 26) removes the first 26 cards and returns them as a new array (hand1)
        const hand1 = this.cards.splice(0, 26);
        // After splice, The remaining 26 cards go to player 2
        const hand2 = this.cards;
        // Return both hands as a 2-item array
        return [hand1, hand2];
    }
}

// STEP 3: Create a Player class: name, hand (array of cards), score
class Player {
    // When we create a new player, give them a name
    constructor(name) {
        this.name = name;           // Saves the player's name for printing
        this.hand = [];             // We have an empty array to start with no cards in their hand 
        this.points = 0;            // They start with 0 points
    }

    // This method adds cards to a player's hand
    addCards(cards) {
        // "..." spreads an array into individual items, so we add all cards at once 
        this.hand.push(...cards);
    }

    // This method plays (removes) one card from the player's hand
    playCard() {
        // shift() removes the first card so the hand gets smaller
        return this.hand.shift();
    }

    // This method checks if the player still has cards
    hasCards() {
        // Return true if they have cards, false if they don't, and we use this to know when the game should stop
        return this.hand.length > 0;
    }

    // This method gives the player 1 point
    addPoint() {
        // Add 1 to their points
        this.points++;
    }

    // This method returns how many points they have
    getScore() {
        return this.points;
    }
}
