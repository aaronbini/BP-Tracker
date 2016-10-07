
export default function readingService () {

  return {
    get () {},
    getByUser (userId) {
      return $http.get(`${apiUrl}/readings/user/${userId}`)
        .then(response => response.data);
    },
    getAggregate () {},
  };
}
