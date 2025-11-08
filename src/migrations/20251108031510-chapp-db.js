'use strict';

/** @type {import('sequelize-cli').Migration} */
    module.exports = {
        async up (queryInterface, Sequelize) {
            /**
                * Add altering commands here.
                *
                * Example:
                * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
            */
            await queryInterface.createTable('users', {
                id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
                username: {type: Sequelize.STRING, allowNull: false},
                password: {type: Sequelize.STRING, allowNull: true},
                googleID: {type: Sequelize.INTEGER, allowNull: true},
                githubID: {type: Sequelize.INTEGER, allowNull: true},
                emailID: {type: Sequelize.INTEGER, allowNull: false},
                fname: {type: Sequelize.STRING, allowNull: true},
                lname: {type: Sequelize.STRING, allowNull: true}
            });

            await queryInterface.createTable('friends', {
                id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
                friendID1: {
                    type: Sequelize.INTEGER, 
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                friendID2: {
                    type: Sequelize.INTEGER, 
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                score: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                missedMessages: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                streak: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                unlockStreakDate: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW                
                },
                endStreakDate: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW               
                },
                isFoF: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                isRival: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                isTop: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                isBest: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                isMutualBest: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                }
            });

            await queryInterface.createTable('conversation', {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                },
                senderID: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: 'users', key: 'id' },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                receiverID: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: 'users', key: 'id' },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },    
                message: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                createdAt: {type: Sequelize.DATE, allowNull: false},
                updatedAt: {type: Sequelize.DATE, allowNull: false}
            }); 


        },

        async down (queryInterface, Sequelize) {
            /**
                * Add reverting commands here.
                *
                * Example:
                * await queryInterface.dropTable('users');
            */
            await queryInterface.dropTable('conversation');
            await queryInterface.dropTable('friends');
            await queryInterface.dropTable('users');
        }
    };
