define({ "api": [
  {
    "type": "post",
    "url": "http://localhost:3030/api/book_table",
    "title": "Book a table in a restaurant with the given capacity and given time range",
    "name": "Book_a_table",
    "group": "Customers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "capacity",
            "description": "<p>Capacity of the table to be searched.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "restaurantId",
            "description": "<p>Id of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "from_datetime",
            "description": "<p>Time Range - From Date and time &quot;yyyy-mm-dd hh:mm:ss&quot; Time should be in 24 hour format.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "to_datetime",
            "description": "<p>Time Range - To Date and time &quot;yyyy-mm-dd hh:mm:ss&quot; Time should be in 24 hour format.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bookingConfirmation",
            "description": "<p>Object which has booking details. Such as Restaurant id, Table id, Booking id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apis.js",
    "groupTitle": "Customers"
  },
  {
    "type": "put",
    "url": "http://localhost:3030/api/cancel_table/:bookingId",
    "title": "Cancel a table",
    "name": "Cancel_Table",
    "group": "Customers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "bookingId",
            "description": "<p>Id of the table booking transaction.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Shows the successful cancelled message with the booking id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apis.js",
    "groupTitle": "Customers"
  },
  {
    "type": "post",
    "url": "http://localhost:3030/api/write_review",
    "title": "Write review on a Restaurant",
    "name": "Customer_Review",
    "group": "Customers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "restaurantId",
            "description": "<p>Id of the restaurant.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email id of the customer.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the customer.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "review",
            "description": "<p>Review about the restaurant written by customer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Shows the successful message of adding the review.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apis.js",
    "groupTitle": "Customers"
  },
  {
    "type": "post",
    "url": "http://localhost:3030/api/find_restaurant",
    "title": "Search Restaurants",
    "name": "Search_restaurants",
    "group": "Customers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the restaurant.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "location",
            "description": "<p>Location of the restaurant.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "cuisine",
            "description": "<p>Type of cuisine that restaurant is famous for.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "restaurantArr",
            "description": "<p>Array of restaurant object that matches any of these 3 field combination.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apis.js",
    "groupTitle": "Customers"
  },
  {
    "type": "post",
    "url": "http://localhost:3030/api/find_restaurant_by_table_capacity",
    "title": "Search for table by capacity for a given Restauant",
    "name": "Search_restaurants_by_table_capacity",
    "group": "Customers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "capacity",
            "description": "<p>Capacity of the table to be searched.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "restaurantId",
            "description": "<p>Id of the restaurant</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "restaurantArr",
            "description": "<p>Array of restaurant object that matches the given table capacity.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apis.js",
    "groupTitle": "Customers"
  },
  {
    "type": "POST",
    "url": "http://localhost:3030/api/add_restaurant",
    "title": "Adding new Restaurant",
    "name": "Add_Restaurant",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the restaurant.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cuisine",
            "description": "<p>Cuisine that the restaurant does</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "restaturantId",
            "description": "<p>Id of the restaurant.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apis.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "post",
    "url": "http://localhost:3030/api/add_table",
    "title": "Add table to a specific restaurant",
    "name": "Add_Table",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "restaurant_id",
            "description": "<p>ID of the restaurant.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "capacity",
            "description": "<p>Set Capacity of a table.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the table created</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apis.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "delete",
    "url": "http://localhost:3030/api/remove_restaurant/:id",
    "title": "Delete a Restaurant",
    "name": "Delete_Restaurant",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the Restaurant to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Shows a successful deleted message with restaurant ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apis.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "delete",
    "url": "http://localhost:3030/api/remove_table/:id",
    "title": "Delete a Table.",
    "name": "Delete_Table",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the table to be deleted.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Shows a successful deleted message with table Id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apis.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "post",
    "url": "http://localhost:3030/api/booking_list",
    "title": "Get bookings for a table by time range",
    "name": "Get_table_by_timeRange",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "tableId",
            "description": "<p>ID of the table.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "from_datetime",
            "description": "<p>Time Range - From Date and time &quot;yyyy-mm-dd hh:mm:ss&quot; Time should be in 24 hour format.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "to_datetime",
            "description": "<p>Time Range - To Date and time &quot;yyyy-mm-dd hh:mm:ss&quot; Time should be in 24 hours format.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "bookinList",
            "description": "<p>Array of restaurant object that has been booked for the given time range.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apis.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "put",
    "url": "http://localhost:3030/api/modify_table",
    "title": "Modify Capacity of a specific table",
    "name": "Modify_Table",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "tableId",
            "description": "<p>ID of the table.</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "capacity",
            "description": "<p>Capacity of a table to be modified.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Shows a successful updation of the table with table Id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apis.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "get",
    "url": "http://localhost:3030/api/onboarding_restaurant",
    "title": "Showing new restaurants",
    "name": "Onboarding_Restaurant",
    "group": "Restaurant",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "restaurant",
            "description": "<p>Array of restaurant objects</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/apis.js",
    "groupTitle": "Restaurant"
  }
] });
