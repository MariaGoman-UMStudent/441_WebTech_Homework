// Class
class Slide{
    constructor(image, title, description, author, year){
        this.image = image;
        this.title = title;
        this.description = description;
        this.author = author;
        this.year = year;
    }
}


// Pictures and information
let slide1 = new Slide(
"images/capital-crawl-tom-olin.png",
"Capitol Crawl",
"On March 12, 1990, over 1000 activists marched over to the U.S. capitol to highlight that buildings posed as inaccessible barriers to people with disabilities. This urged Congress to pass the ADA, the civil rights law that ensures accessibility and equal rights to millions of Americans with disabilities.",
"Tom Olin",
"1990"
);

let slide2 = new Slide(
"images/ed-roberts-by-tom-olin.png",
"Ed Roberts",
"Ed Roberts was an American disability right's activists and pioneer of the Independent Living Movement. He contracted polio at the age of 14, which left him paralyzed from the neck down. He also became the first wheelchair user at UC Berkeley. He is a reminder that having a disability doesn't get in the way of living a fulfilling and independent life.",
"Tom Olin",
"1970s-80s"
);

let slide3 = new Slide(
"images/Franklin-D-Roosevelt-Portrait.png",
"Franklin D Roosevelt",
"Franklin Delano Roosevelt was the 32nd President of the United States. In August 1921, he contracted polio and became paralyzed waist down. He was urged to retire, but decided to remain in politics. Roosevelt demonstrated that his illness did not destroy his political success. He became the longest standing president in US history.",
"Unknown Author",
"1910s"
);

let slide4 = new Slide(
"images/Judy-Huemann-by-Anthony-Tusler.png",
"Judy Huemann",
"Judy Heumann was an American disability activist who fought for the integration and equality of individuals with disabilities. At just 18 months old, Judy contracted polio, which left her wheelchair-bound for most of her life. Her policy and advocacy works include Heumann v. Board of Education of the City of New York and the 504 Sit-In.",
"Anthony Tusler",
"1977"
);

let slide5 = new Slide(
"images/Lois-Curtis.png",
"Lois Curtis",
"Lois Curtis was an American disability rights activist who played a key role in advancing the rights of people with disabilities to live in their communities rather than in institutions. After spending years in state psychiatric hospitals, she became the lead plaintiff in the landmark U.S. Supreme Court case Olmstead v. L.C. (1999), which ruled that unjustified institutionalization is a form of discrimination under the Americans with Disabilities Act. Her case helped ensure that people with disabilities have the right to receive care in the least restrictive, community-based settings possible.",
"Unknown Author",
"2010s"
);


// Array
let slides = [slide1, slide2, slide3, slide4, slide5];

//Store last slide index
let lastIndex = -1;


// Display function
function displaySlide(slide){

    console.log(slide.image);

    document.getElementById("slideImage").src = slide.image;
    document.getElementById("slideTitle").textContent = slide.title;
    document.getElementById("slideDescription").textContent = slide.description;
    document.getElementById("slideAuthor").textContent = slide.author;
    document.getElementById("slideYear").textContent = slide.year;

        // Change background image
    document.body.style.backgroundImage = `url(${slide.image})`;

}


//Random slide function
function nextSlide(){

    let randomIndex;

    do{
        randomIndex = Math.floor(Math.random() * slides.length);
    }
    while(randomIndex === lastIndex);

    lastIndex = randomIndex;

    displaySlide(slides[randomIndex]);
}

// Button Action
document.getElementById("nextBtn").addEventListener("click", nextSlide);


// Show first slide
nextSlide();