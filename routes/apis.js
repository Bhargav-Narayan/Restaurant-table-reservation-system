var express = require('express')
var apiController = express.Router();
var path = require('path');
var connection = require('../utils/connection.js');

/**
 * @api {POST} http://localhost:3030/api/add_restaurant Adding new Restaurant
 * @apiName Add Restaurant
 * @apiGroup Restaurant
 *
 * @apiParam {String} name Name of the restaurant.
 * @apiParam {String} location Location of the restaurant
 * @apiParam {String} cuisine Cuisine that the restaurant does 
 *
 * @apiSuccess {Object} restaturantId Id of the restaurant.
 */
apiController.post('/add_restaurant', function(req, res) {
    console.log(req.body)
    var restaurantParams = {};
    restaurantParams.name = req.body.name;
    restaurantParams.location = req.body.location;
    restaurantParams.cuisine = req.body.cuisine;
    apiController.addRestaurant(restaurantParams, function(err, additionStatus) {
        if (err) {
            res.status(400).send("Something went wrong")
        } else {
            res.send(additionStatus)
        }
    })
})


/**
 * @api {get} http://localhost:3030/api/onboarding_restaurant Showing new restaurants
 * @apiName Onboarding Restaurant
 * @apiGroup Restaurant
 *
 * @apiSuccess {Object[]} restaurant Array of restaurant objects
 */
apiController.get('/onboarding_restaurant', function(req, res) {
    apiController.getOnboardingRestaurant(function(err, restaurantArr) {
        if (err) {
            res.status(400).send("Something went wrong")
        } else {
            if (restaurantArr.length == 0) {
                res.json([])
            } else {
                res.json(restaurantArr)
            }
        }
    })
})

/**
 * @api {delete} http://localhost:3030/api/remove_restaurant/:id Delete a Restaurant
 * @apiName Delete Restaurant
 * @apiGroup Restaurant 
 *
 * @apiParam {Integer} id ID of the Restaurant to be deleted
 *
 * @apiSuccess {String} message Shows a successful deleted message with restaurant ID
 */
apiController.delete('/remove_restaurant/:id', function(req, res) {
    var restaurantId = req.params.id;
    apiController.removeRestaurant(restaurantId, function(err, deletedStatus) {
        if (err) {
            res.status(400).send("Something went wrong")
        } else {
            res.send(deletedStatus)
        }
    })
})

/**
 * @api {post} http://localhost:3030/api/add_table Add table to a specific restaurant
 * @apiName Add Table
 * @apiGroup Restaurant 
 *
 * @apiParam {Integer} restaurant_id ID of the restaurant.
 * @apiParam {Integer} capacity Set Capacity of a table.
 *
 * @apiSuccess {Object} id Id of the table created
 */
apiController.post('/add_table', function(req, res) {
    console.log(req.body);
    var tableParams = {}
    tableParams.restaurantId = req.body.restaurant_id;
    tableParams.tableCapacity = req.body.capacity;

    apiController.addTable(tableParams, function(err, tableAdditionStatus) {
        if (err) {
            res.status(400).send("Something went wrong");
        } else {
            res.send(tableAdditionStatus)
        }
    })
})

/**
 * @api {delete} http://localhost:3030/api/remove_table/:id Delete a Table.
 * @apiName Delete Table
 * @apiGroup Restaurant 
 *
 * @apiParam {Integer} id ID of the table to be deleted.
 *
 * @apiSuccess {String} message Shows a successful deleted message with table Id
 */
apiController.delete('/remove_table/:id', function(req, res) {
    var tableId = req.params.id;
    apiController.removeTable(tableId, function(err, deleteTableStatus) {
        if (err) {
            res.status(401).send("Something went wrong");
        } else {
            res.send(deleteTableStatus)
        }
    })
})

/**
 * @api {put} http://localhost:3030/api/modify_table Modify Capacity of a specific table
 * @apiName Modify Table
 * @apiGroup Restaurant 
 *
 * @apiParam {Integer} tableId ID of the table.
 * @apiParam {Integer} capacity Capacity of a table to be modified.
 *
 * @apiSuccess {String} message Shows a successful updation of the table with table Id.
 */
apiController.put('/modify_table', function(req, res) {
    var tableId = req.body.tableId;
    var capacity = req.body.capacity;
    apiController.updateTableCapacity(tableId, capacity, function(err, updateStatus) {
        if (err) {
            res.status(400).send("Something went wrong");
        } else {
            res.send(updateStatus);
        }
    })
})

/**
 * @api {post} http://localhost:3030/api/booking_list Get bookings for a table by time range
 * @apiName Get table by timeRange
 * @apiGroup Restaurant 
 *
 * @apiParam {Integer} tableId ID of the table.
 * @apiParam {String} from_datetime Time Range - From Date and time "yyyy-mm-dd hh:mm:ss" Time should be in 24 hour format.
 * @apiParam {String} to_datetime Time Range - To Date and time "yyyy-mm-dd hh:mm:ss" Time should be in 24 hours format.
 *
 * @apiSuccess {Object} bookinList Array of restaurant object that has been booked for the given time range.
 */
apiController.post('/booking_list', function(req, res) {
    var tableId = req.body.tableId;
    var timeRange = {}
    timeRange.fromDateTime = req.body.from_datetime;
    timeRange.toDateTime = req.body.to_datetime;
    apiController.getBookingListForTable(tableId, timeRange, function(err, bookingList) {
        if (err) {
            res.status(400).send("Something went wrong");
        } else {
            res.json(bookingList)
        }
    })
})

/**
 * @api {post} http://localhost:3030/api/find_restaurant Search Restaurants
 * @apiName Search restaurants
 * @apiGroup Customers 
 *
 * @apiParam {String} [name] Name of the restaurant. 
 * @apiParam {String} [location] Location of the restaurant. 
 * @apiParam {String} [cuisine] Type of cuisine that restaurant is famous for.
 *
 * @apiSuccess {Object} restaurantArr Array of restaurant object that matches any of these 3 field combination.
 */
apiController.post('/find_restaurant', function(req, res) {
    var name = req.body.name;
    var location = req.body.location;
    var cuisine = req.body.cuisine;
    searchParams = {}
    searchParams.name = name
    searchParams.location = location
    searchParams.cuisine = cuisine
    apiController.findRestaurant(searchParams, function(err, restaurantArr) {
        if (err) {
            res.status(500).send("Something went wrong")
        } else {
            res.json(restaurantArr)
        }
    })
})

/**
 * @api {post} http://localhost:3030/api/find_restaurant_by_table_capacity Search for table by capacity for a given Restauant 
 * @apiName Search restaurants by table capacity
 * @apiGroup Customers 
 *
 * @apiParam {Integer} capacity Capacity of the table to be searched. 
 * @apiParam {Integer} restaurantId Id of the restaurant 
 *
 * @apiSuccess {Object} restaurantArr Array of restaurant object that matches the given table capacity.
 */
apiController.post('/find_restaurant_by_table_capacity', function(req, res) {
    var capacity = req.body.capacity;
    var restaurantId = req.body.restaurantId;
    apiController.findTableByCapacityForGivenRestaurant(restaurantId, capacity, function(err, restaurantArr) {
        if (err) {
            res.status(400).send("Something went wrong")
        } else {
            res.json(restaurantArr)
        }
    })
})

/**
 * @api {post} http://localhost:3030/api/book_table Book a table in a restaurant with the given capacity and given time range
 * @apiName Book a table
 * @apiGroup Customers 
 *
 * @apiParam {Integer} capacity Capacity of the table to be searched. 
 * @apiParam {Integer} restaurantId Id of the restaurant 
 * @apiParam {String} from_datetime Time Range - From Date and time "yyyy-mm-dd hh:mm:ss" Time should be in 24 hour format.
 * @apiParam {String} to_datetime Time Range - To Date and time "yyyy-mm-dd hh:mm:ss" Time should be in 24 hour format.
 *
 * @apiSuccess {Object} bookingConfirmation Object which has booking details. Such as Restaurant id, Table id, Booking id.
 */
apiController.post('/book_table', function(req, res) {
    var restaurantId = req.body.restaurantId;
    var capacity = req.body.capacity;
    var fromDateTime = req.body.from_datetime;
    var toDateTime = req.body.to_datetime;
    var bookingParams = {}
    bookingParams.restaurantId = restaurantId;
    bookingParams.capacity = capacity;
    bookingParams.fromDateTime = fromDateTime;
    bookingParams.toDateTime = toDateTime;
    apiController.bookTable(bookingParams, function(err, bookedStatus) {
        if (err) {
            res.status(500).send("Something went wrong")
        } else {
            console.log("This is the bookedStatus")
            console.log(bookedStatus)
            if (bookedStatus.bookingId) {
                var bookingConfirmation = {
                    restaurant_id: restaurantId,
                    table_id: bookedStatus.tableId,
                    booking_id: bookedStatus.bookingId
                }
                res.json(bookingConfirmation)
            } else {
                res.send("Sorry couldn't book a reservation for the restaurant for the capacity mentioned. There are no availability of tables for this restaurant. Please try to book an other restaurant");
            }
        }
    })
})

/**
 * @api {put} http://localhost:3030/api/cancel_table/:bookingId Cancel a table
 * @apiName Cancel Table
 * @apiGroup Customers 
 *
 * @apiParam {Integer} bookingId Id of the table booking transaction.  
 *
 * @apiSuccess {String} message Shows the successful cancelled message with the booking id. 
 */
apiController.put('/cancel_table/:bookingId', function(req, res) {
    var bookingId = req.params.bookingId;
    apiController.cancelBooking(bookingId, function(err, cancelStatus) {
        if (err) {
            res.status(500).send("Something went wrong")
        } else {
            if (cancelStatus == 0) {
                res.status(400).send("Invalid request parameters")
            } else {
                res.send("Successfully cancelled the table booking with the booking id " + bookingId)
            }
        }
    })
})

/**
 * @api {post} http://localhost:3030/api/write_review Write review on a Restaurant
 * @apiName Customer Review
 * @apiGroup Customers 
 *
 * @apiParam {Integer} restaurantId Id of the restaurant. 
 * @apiParam {String} email Email id of the customer.
 * @apiParam {String} name Name of the customer.
 * @apiParam {String} review Review about the restaurant written by customer 
 *
 * @apiSuccess {String} message Shows the successful message of adding the review.
 */
apiController.post('/write_review', function(req, res) {
    var restaurantId = req.body.restaurantId;
    var customerEmail = req.body.email;
    var customerName = req.body.name;
    var customerReview = req.body.review;
    var reviewParams = {}
    reviewParams.restaurantId = restaurantId;
    reviewParams.email = customerEmail;
    reviewParams.name = customerName;
    reviewParams.review = customerReview;
    apiController.writeCustomerReviews(reviewParams, function(err, reviewStatus) {
        if (err) {
            res.status(500).send("Something went wrong")
        } else {
            if (reviewStatus == 0) {
                res.status(400).send("Couldnot write review for the request")
            } else {
                res.send("Successfully written the customer review")
            }

        }
    })
})

// Function to add a new Restaurant
// Accepts restaurant related fields as parmaeters and insert it into the restaurants table
// After successful addition, sends the id of the row added in restaurants table.
apiController.addRestaurant = function(restaurantParams, callback) {
    var addRestaurantQuery = "INSERT INTO restaurants (name, location, cuisine) VALUES ('" + restaurantParams.name + "', '" + restaurantParams.location + "', '" + restaurantParams.cuisine + "')"
    console.log(addRestaurantQuery)
    connection.query(addRestaurantQuery, function(err, insertStatus) {
        if (err) {
            console.log(err)
            callback(err, null)
        } else {
            if (insertStatus.affectedRows > 0) {
                var responseParams = {
                    restaurantId: insertStatus.insertId
                }
                callback(null, responseParams)
            } else {
                callback(null, "Sorry couldn't insert the restaurant you requested")
            }
        }
    })
}

// Function to get latest restaurants in Restaurant table
// Returns an array of newly added restaurants in restaurants table
apiController.getOnboardingRestaurant = function(callback) {
    var onboardRestaurantsQuery = "select * from restaurants order by id desc limit 3";
    connection.query(onboardRestaurantsQuery, function(err, restaurantArr) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            if (restaurantArr.length == 0) {
                callback(null, [])
            } else {
                callback(null, restaurantArr)
            }
        }
    })
}

// Function to delete a restaurant from restaurants table
// Accepts the id of the restaurant which needs to be removed and delete the entry of the row in restaurants table
// Retutns a successful deletion of restaurant message
apiController.removeRestaurant = function(restaurantId, callback) {
    var removeRestaurantQuery = "delete from restaurants where id = " + restaurantId
    connection.query(removeRestaurantQuery, function(err, deleteStatus) {
        if (err) {
            console.log(err);
            callback(err, null)
        } else {
            console.log("This is the deleted status")
            console.log(deleteStatus);
            if (deleteStatus.affectedRows > 0) {
                callback(null, "Deleted restaurant with id " + restaurantId)
            } else {
                callback(null, "The restaurant requested with the id " + restaurantId + " for deletion doesn't exists")
            }
        }
    })
}

// Funtion to add a new table to restaurant_tables table.
// Accepts all table related details as parameters and Insert it into restaurant_tables table
// On Successful addition, Returns the id of the row added in restaurant_tables.
apiController.addTable = function(tableParams, callback) {
    console.log(tableParams)
    var addTableQuery = "INSERT INTO restaurant_tables (restaurant_id, capacity) VALUES ('" + tableParams.restaurantId + "', '" + tableParams.tableCapacity + "')"
    console.log(addTableQuery)
    connection.query(addTableQuery, function(err, addTableStatus) {
        if (err) {
            console.log(err)
            callback(err, null)
        } else {
            if (addTableStatus.affectedRows > 0) {
                var tableId = {}
                tableId.id = addTableStatus.insertId;
                callback(null, tableId)
            } else {
                callback(null, "Sorry couldn't add table into DB.")
            }
        }
    })
}

// Function to remove table from restaurant_tables table
// Accepts the id of the table to be delted and delete the entry in the restaurant_tables table
// Returns a successful deletion message
apiController.removeTable = function(tableId, callback) {
    console.log(tableId);
    var deleteTableQuery = "delete from restaurant_tables where id = " + tableId;
    connection.query(deleteTableQuery, function(err, deleteTableStatus) {
        if (err) {
            callback(err, null)
        } else {
            if (deleteTableStatus.affectedRows > 0) {
                callback(null, "Successfully deleted table with the id " + tableId)
            } else {
                callback(null, "The Table requested with the id " + tableId + " for deletion doesn't exists")
            }
        }
    })
}

// Function to update the capacity of a particulat table
// Accepts tableID and tableCapacity to be modified as parameters. And modifies the capacity of the table in restaurant_tables table
// Returns a successful updation of capacity for a particular table message
apiController.updateTableCapacity = function(tableId, tableCapacity, callback) {
    console.log(tableId, tableCapacity)
    var updateTableQuery = "update restaurant_tables set capacity = " + tableCapacity + " where id = " + tableId;
    console.log(updateTableQuery)
    connection.query(updateTableQuery, function(err, updateStatus) {
        if (err) {
            console.log(err)
            callback(err, null)
        } else {
            console.log(updateStatus)
            if (updateStatus.changedRows > 0) {
                callback(null, "Successfully updated capacity of the table with table id as " + tableId)
            } else {
                callback(null, "The table requested with the id " + tableId + " for modification doesn't exists");
            }
        }
    })
}

// Function to find the restaurants which are booked at a given time range
// Accepts tableId and timeRange as parameters. Search table_bookings table with the given tableId and the timeRange. 
// On successful search, returns all the tables matched in an Array.  
apiController.getBookingListForTable = function(tableId, timeRange, callback) {
    var fromDateTime = timeRange.fromDateTime
    var toDateTime = timeRange.toDateTime
    var bookingByTimeRange = "SELECT t.id, t.capacity from restaurant_tables t join table_bookings b on b.table_id = t.id where b.table_id = " + tableId + " AND ((CONVERT('" + timeRange.fromDateTime + "', DATETIME) BETWEEN b.from_datetime AND b.to_datetime) OR (CONVERT('" + timeRange.toDateTime + "', DATETIME) BETWEEN b.from_datetime AND b.to_datetime)) AND b.booking_status = 'booked';";
    console.log(bookingByTimeRange)
    connection.query(bookingByTimeRange, function(err, bookingList) {
        if (err) {
            console.log(err)
            callback(err, null)
        } else {
            if (bookingList.length == 0) {
                callback(null, [])
            } else {
                callback(null, bookingList)
            }
        }
    })
}

// Function to find the restaurants by applying filters (name, location, cuisine)
// Accepts all the search Parmeters. Search for the restaurants with any of the combinations of these 3 parameters.
// Query is dynamycally created using string concatenation and flags.
// On Successful search, sends the list of matched restaurants
apiController.findRestaurant = function(searchParams, callback) {
    var count = 0;
    var f1 = f2 = f3 = false;
    if (searchParams.name) {
        var nameQuery = "name LIKE '%" + searchParams.name + "%'";
        count++;
        f1 = true;
    }
    if (searchParams.location) {
        var locQuery = "location LIKE '%" + searchParams.location + "%'";
        count++;
        f2 = true;
    }
    if (searchParams.cuisine) {
        var cuisineQuery = "cuisine LIKE '%" + searchParams.cuisine + "%'";
        count++;
        f3 = true;
    }
    if (!f1 && !f2 && !f3) {
        var filterRestaurantQuery = "select * from restaurants;"
    } else {
        var baseQuery = "select * from restaurants where "
        if (count == 1) {
            if (f1) {
                var filterRestaurantQuery = baseQuery + nameQuery;
            } else if (f2) {
                var filterRestaurantQuery = baseQuery + locQuery;
            } else if (f3) {
                var filterRestaurantQuery = baseQuery + cuisineQuery;
            }
        } else if (count == 2) {
            if (f1 && f2) {
                var filterRestaurantQuery = baseQuery + nameQuery + " AND " + locQuery;
            } else if (f1 && f3) {
                var filterRestaurantQuery = baseQuery + nameQuery + " AND " + cuisineQuery;
            } else if (f2 && f3) {
                var filterRestaurantQuery = baseQuery + locQuery + " AND " + cuisineQuery;
            }
        } else if (count == 3) {
            if (f1 && f2 && f3) {
                var filterRestaurantQuery = baseQuery + nameQuery + " AND " + locQuery + " AND " + cuisineQuery;
            }
        }
    }
    console.log(filterRestaurantQuery);
    connection.query(filterRestaurantQuery, function(err, restaurantArr) {
        if (err) {
            console.log(err)
            return callback(err, null)
        } else {
            console.log(restaurantArr);
            if (restaurantArr.length == 0) {
                return callback(null, [])
            } else {
                return callback(null, restaurantArr)
            }
        }
    })
}

// Function to find all the restaurants where the required capacity meets the table capacity
// Accepts the restaurant id and capacity of the parameters and search for all the tables which has capacity greater than or Equal to required Capacity.
// On successful search, Returns the array of tables matched
apiController.findTableByCapacityForGivenRestaurant = function(restaurantId, capacity, callback) {
    var queryByTableCapacity = "select * from restaurant_tables where capacity >= " + capacity + " AND restaurant_id = " + restaurantId
    console.log(queryByTableCapacity)
    connection.query(queryByTableCapacity, function(err, tableArr) {
        if (err) {
            callback(err, null)
        } else {
            if (tableArr.length == 0) {
                callback(null, [])
            } else {
                callback(null, tableArr)
            }
        }
    })
}

// Function to book a table.
// Accepts 4 parameters - Restaurant id, table id, capacity, from_datetime, to_datetime.
// Calls findTableByCapacityForGivenRestaurant funtion and fetches all the tables which match the required capacity
// On successful search, find all the booking list for all tables. If the tables hasn't been booked for the given timeRange, then book the first table in the array.
// Adds an entry to table_bookings table with tableId, from_datetime, to_datetime, and booking_status as 'booked'. 
apiController.bookTable = function(bookingParams, callback) {

    apiController.findTableByCapacityForGivenRestaurant(bookingParams.restaurantId, bookingParams.capacity, function(err, tableArr) {
        if (err) {
            callback(err, null)
        } else {
            console.log(tableArr)
            if (tableArr.length == 0) {
                callback(null, 0)
            } else {
                var timeRange = {
                    fromDateTime: bookingParams.fromDateTime,
                    toDateTime: bookingParams.toDateTime
                }
                var freeTables = [];
                tableArr.forEach(function(table, index) {
                    apiController.getBookingListForTable(table.id, timeRange, function(err, freeTableArr) {
                        if (err) {
                            callback(err, null)
                        } else {
                            console.log(freeTableArr)
                            if (freeTableArr.length != 0) {
                                console.log("Table not free table Id - " + table.id)
                                if (index == tableArr.length - 1) {
                                    console.log(freeTables.length);
                                    if (freeTables.length == 0) {
                                        callback(null, 0)
                                    } else {
                                        insertTableBookings(freeTables[0], function(err, insertStatus) {
                                            if (err) {
                                                callback(err, null)
                                            } else {
                                                console.log(insertStatus)
                                                if (insertStatus) {
                                                    var bookedIdParams = {
                                                        bookingId: insertedStatus,
                                                        tableId: freeTables[0]
                                                    }
                                                    callback(null, bookedIdParams)
                                                }
                                            }
                                        })
                                    }
                                }
                            } else {
                                freeTables.push(table.id)
                                console.log(freeTables)
                                if (index == tableArr.length - 1) {
                                    console.log(freeTables.length);
                                    if (freeTables.length == 0) {
                                        callback(null, 0)
                                    } else {
                                        insertTableBookings(freeTables[0], function(err, insertedStatus) {
                                            if (err) {
                                                callback(err, null)
                                            } else {
                                                if (insertedStatus) {
                                                    var bookedIdParams = {
                                                        bookingId: insertedStatus,
                                                        tableId: freeTables[0]
                                                    }
                                                    callback(null, bookedIdParams)
                                                }
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    })

                })
            }
        }
    })

    var insertTableBookings = function(freeTableId, cb) {
        console.log(freeTableId)
        var bookTableQuery = "insert into table_bookings (table_id, from_datetime, to_datetime, booking_status) VALUES (" + freeTableId + ", CONVERT('" + bookingParams.fromDateTime + "', DATETIME), CONVERT('" + bookingParams.toDateTime + "', DATETIME), 'booked')";
        connection.query(bookTableQuery, function(err, insertStatus) {
            console.log(insertStatus)
            if (err) {
                cb(err, null)
            } else {
                if (insertStatus.affectedRows > 0) {
                    cb(null, insertStatus.insertId);
                } else {
                    cb(null, null)
                }
            }
        })
    }
}

// Function to cancel a table booking.
// Accepts booking Id as the parameter and updates table_bookings table with cancelled as the booking_state
// On successful updation, Returns the success message
apiController.cancelBooking = function(bookingId, callback) {
    var cancelQuery = "update table_bookings set booking_status = 'cancelled' where id = " + bookingId
    connection.query(cancelQuery, function(err, cancelledStatus) {
        if (err) {
            callback(err, null)
        } else {
            console.log(cancelledStatus)
            if (cancelledStatus.affectedRows > 0) {
                callback(null, "Success");
            } else {
                callback(null, 0)
            }
        }
    })
}

// Function to create a customer review for a restaurant
// Accepts all review related objects as parameters and inserts all the parameters to customer_review table
// On successful addition, returns a success message
apiController.writeCustomerReviews = function(reviewParams, callback) {
    var reviewQuery = "INSERT INTO customer_review (restaurant_id, customer_email, customer_name, customer_review) VALUES (" + reviewParams.restaurantId + ", '" + reviewParams.email + "', '" + reviewParams.name + "', '" + reviewParams.review + "');";
    console.log(reviewQuery)
    connection.query(reviewQuery, function(err, reviewStatus) {
        if (err) {
            console.log(err)
            callback(err, null)
        } else {
            if (reviewStatus.affectedRows > 0) {
                callback(null, "Success")
            } else {
                callback(null, 0)
            }
        }
    })
}

module.exports = apiController;
