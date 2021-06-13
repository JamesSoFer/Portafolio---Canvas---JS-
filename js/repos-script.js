// The code goes down here

fetch('https://api.github.com/users/JamesSoFer/repos')
  .then((response) => response.json())
  .then((data) => {
    const ulRepos = document.querySelector('.wrapper-githubRepos ul');

    for (let i = 0; i < data.length; i += 1) {
      const listItem = document.createElement('li');
      ulRepos.appendChild(listItem);

      const repositoryName = document.createElement('p');
      repositoryName.innerHTML = data[i].name;

      listItem.appendChild(repositoryName);
    }
  });
