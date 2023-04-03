


const getFeeds = {
    tags: ["Feeds"],
    summary: "Get list of Feeds",
    responses: {
        200: {
            description: 'Feed found successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/definitions/Feed'
                        }
                    }
                }
            }
        },
    },
}

const postFeeds = {
    tags: ["Feeds"],
    summary: "Create a new Feed",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: '#/schemas/Feed',
                }
            }
        }
    },
    responses: {
        201: {
            description: 'Feed created successfully',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/definitions/Feed'
                    }
                }
            }
        },
        400: {
            description: 'Invalid request payload'
        }
    },
}

const updateFeed = {
    tags: ["Feeds"],
    summary: "Update a Feed",
    parameters: [
        {
            $ref: "#/parameters/Feed",
        }
    ],
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: '#/schemas/Feed',
                }
            }
        }
    },
    responses: {
        200: {
            description: 'Feed updated successfully',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/definitions/Feed'
                    }
                }
            }
        },
        400: {
            description: "Invalid feed data",
        },
        404: {
            description: "feed not found",
        },
    },
}

const getFeedById = {
    tags: ["Feeds"],
    summary: "Get requested Feed",
    parameters: [
        {
            $ref: "#/parameters/Feed",
        }
    ],
    responses: {
        200: {
            description: "Feed found succesfully",
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/definitions/Feed'
                    }
                }
            }
        },
        400: {
            description: "Invalid id",
        },
        404: {
            description: "feed not found",
        },
    },
}

const deleteFeed = {
    tags: ["Feeds"],
    summary: "Delete requested Feed",
    parameters: [
        {
            $ref: "#/parameters/Feed",
        }
    ],
    responses: {
        204: {
            description: "Feed deleted sucesfully",
        },
        400: {
            description: "Invalid id",
        },
        404: {
            description: "feed not found",
        },
    },
}

const feedPaths = {
    feeds: {
        post: postFeeds,
        get: getFeeds,
    },
    feedsId: {
        get: getFeedById,
        patch: updateFeed,
        delete: deleteFeed
    }
}

const feedDefinitions = {
    properties: {
        id: {
            type: "string",
        },
        title: {
            type: "string",
        },
    },
}

const feedSchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
        },
    },
    required: [
        'title'
    ]
}
const feedParameters = {
    name: 'feedId',
    in: 'path',
    description: 'The ID of the feed to retrieve',
    required: true,
    schema: {
        type: 'string'
    }
}

export {
    feedPaths,
    feedDefinitions,
    feedSchema,
    feedParameters
}