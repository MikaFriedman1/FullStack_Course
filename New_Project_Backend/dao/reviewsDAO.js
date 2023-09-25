import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let reviews 

export default class ReviewsDAO {   
    static async injectDB(conn) {
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db("Reviews").collection("reviews")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

static async addReview(movieId, user, review) {
    try {
        const reviewDoc = {
            user: user,
            review: review,
            movieId: parseInt(movieId)
         }

        const test = await reviews.insertOne(reviewDoc)
        console.log("test", test)
        return test
        // return await reviews.insertOne(reviewDoc)
    }
    catch(e) {
        console.error(`Unable to post review: ${e}`)
        return { error: e }
    }
}

static async getReviewbyId(reviewId){
    try {
        return await reviews.findOne({ _id: ObjectId(reviewId) })
    } catch (e) {
        console.error(`Unable to get review: ${e}`)
        return { error: e }
    }
}

static async updateReview(reviewId, userId, review) {
    console.log("rev", reviewId)
    try {   
        const updateResponse = await reviews.updateOne(
            {_id: ObjectId(reviewId)},  
            { $set: { review: review, user: userId } },
        )
        console.log("up", updateResponse)
        console.log("test")
        return updateResponse
    } catch (e) {
        console.error(`Unable to update review: ${e}`)
        return { error: e }
    }       
}

static async getReviewByMovieId(movieId){
    console.log("mov", movieId)
    try {
        const cursor = await reviews.find({ movieId: parseInt(movieId) })
        return cursor.toArray() 
    }
    catch(e) {
        console.error(`Unable to get review: ${e}`)
        return { error: e }
    }
}

static async deleteReview(reviewId) {
    try {
        console.log("rev", reviewId)
        const deleteResponse = await reviews.deleteOne({
            _id: ObjectId(reviewId)
        })
        return deleteResponse
    } catch (e) {
        console.error(`Unable to delete review: ${e}`)
        return { error: e }
    }
}

}



