//Graphql Query file
const searchQuery = `
    query searchPlaces($term: String, $location: String, $limit: Int, $offset: Int) {
        search(term: $term, location: $location, limit: $limit, offset: $offset) {
          business {
            name
            phone
            id
            price
            coordinates{
              latitude
              longitude
            }
            location {
              address1
              city
              postal_code
              country
            }
            rating
            review_count
            url
            photos
            reviews {
              time_created
              rating
              url
              user {
                name
                image_url
              }
              text
            }
          }
        }
    }
      `;

const searchTotalQuery = `
 query searchTotal($term: String, $location: String, $limit: Int, $offset: Int){
   search(term: $term, location: $location, limit: $limit, offset: $offset) {
     total
   }
 }
 `;

module.exports = { searchQuery, searchTotalQuery };