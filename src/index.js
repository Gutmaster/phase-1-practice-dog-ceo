console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"
const imgList = document.getElementById('dog-image-container')
const breedList = document.getElementById('dog-breeds')
const dropDown = document.getElementById('breed-dropdown')

const filterBreeds = function(){
    let breeds = breedList.getElementsByTagName('li')
    for(let breed of breeds){
        if(breed.innerText[0] !== dropDown.value){
            breed.hidden = true
        }
        else{
            breed.hidden = false
        }
    }
}

document.addEventListener('DOMContentLoaded', function(){
    fetch(imgUrl)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        data.message.forEach(function(dogPic){
            let newImg = document.createElement('img')
            newImg.src = dogPic
            newImg.alt = 'Nice Doggy'
            imgList.appendChild(newImg)
        })
    })
    fetch(breedUrl)
    .then((response) => response.json())
    .then(function(data){
        for(let breed in data.message){
            let li = document.createElement('li')
            let subList = document.createElement('ul')
            li.innerText = breed
            li.addEventListener('click', (event) => li.style.color = 'green')
            breedList.append(li)
            li.append(subList)

            for(let type of data.message[breed]){
                let subType = document.createElement('li')
                subType.innerText = type
                subType.addEventListener('click', (event) => subType.style.color = 'blue')
                subList.append(subType)
            }
        }
    })
    dropDown.addEventListener('change', filterBreeds)
})