// create image tag names (12 total)
var imageTags = [];
for(var i = 0; i < 12; i++)
{
    imageTags.push("image" + i);
}

// blank image path
var blankImagePath = "https://mario.wiki.gallery/images/thumb/7/7f/Question_Block_-_Nintendo_JP_website.png/1200px-Question_Block_-_Nintendo_JP_website.png";

// create blank image array
var blankImages = [];
for(var i = 0; i < 12; i++)
{
    blankImages.push(blankImagePath);
}

// actual image array
var actualImages = [];

function printBlanks()
{
    createRandomImageArray();

    var board = document.getElementById("gameBoard");
    board.innerHTML = "";

    for(var i = 0; i < 12; i++)
    {
        board.innerHTML += 
            "<img src='" + blankImages[i] + 
            "' id='image" + i + 
            "' onclick='flipImage(" + i + ")' width='150' height='150'>";
    }
}

actualImages = []; // reset array
function createRandomImageArray()
{
    var actualImagePath = [
        "https://www.creativefabrica.com/wp-content/uploads/2024/08/30/Cute-Boba-Tea-Vector-Illustration-Graphics-104898008-1.jpg",
        "https://png.pngtree.com/png-vector/20230919/ourmid/pngtree-colorful-cupcake-clipart-png-image_10132019.png",
        "https://t3.ftcdn.net/jpg/02/66/08/38/360_F_266083810_zGmRdMbOVoIa9kRoe9ivR3KETGxJNg6C.jpg",
        "https://png.pngtree.com/png-vector/20191031/ourmid/pngtree-cheese-vector-illustration-with-filled-line-design-isolated-on-white-background-png-image_1928824.jpg",
        "https://img.freepik.com/premium-vector/cute-sunglass-clipart-vector-art-illustration_761413-21529.jpg",
        "https://static.vecteezy.com/system/resources/previews/054/220/252/non_2x/tall-vanilla-milk-carton-clipart-cute-flat-illustration-of-vanilla-flavored-dairy-drink-ideal-for-prints-signs-and-symbols-simple-and-charming-design-vector.jpg",
    ];

    var count = [0,0,0,0,0,0];

    while(actualImages.length < 12)
    {
        var randomNumber = Math.floor(Math.random() * actualImagePath.length);

        if(count[randomNumber] < 2)
        {
            actualImages.push(actualImagePath[randomNumber]);
            count[randomNumber]++;
        }
    }
}

function flipImage(number)
{
    document.getElementById(imageTags[number]).src = actualImages[number];
}