const paginate = (followers) => {
  const itemPerPage = 8;
  const pages = Math.ceil(followers.length / itemPerPage);

  const newFollers = Array.from({ length: pages }, (_, index) => {
    const start = index * itemPerPage;
    return followers.slice(start, start + itemPerPage);
  });

  return newFollers;
};

export default paginate;
