document.addEventListener('DOMContentLoaded', () => { 
    const ingredients = document.querySelectorAll('.ingredient');
    const generateButton = document.getElementById('generateDream');
    const dreamCard = document.getElementById('dreamCard');
    const dreamTitle = document.getElementById('dreamTitle');
    const dreamDescription = document.getElementById('dreamDescription');
    const ingredientCount = document.getElementById('ingredientCount');
    const maxIngredients = 3;

    // Handle ingredient selection with counter
    ingredients.forEach(ingredient => {
        ingredient.addEventListener('click', () => {
            const selected = document.querySelectorAll('.ingredient.selected');
            
            if (ingredient.classList.contains('selected')) {
                // Deselect if already selected
                ingredient.classList.remove('selected');
            } else {
                // Only allow up to maxIngredients
                if (selected.length < maxIngredients) {
                    ingredient.classList.add('selected');
                } else {
                    alert(`You can only select up to ${maxIngredients} dream ingredients!`);
                }
            }

            // Update counter
            ingredientCount.textContent = document.querySelectorAll('.ingredient.selected').length;
        });
    });

    const dreamTemplates = {
        space: ['Cosmic Voyage', 'Stellar Adventure', 'Galactic Dreams'],
        ocean: ['Deep Sea Mystery', 'Aquatic Wonder', 'Ocean Paradise'],
        romance: ['Love in Neo-Tokyo', 'Cyber Romance', 'Digital Love'],
        flying: ['Sky Runner', 'Aerial Freedom', 'Cloud Dancer'],
        mystery: ['Neural Enigma', 'Quantum Puzzle', 'Digital Detective'],
        adventure: ['Tech Explorer', 'Virtual Quest', 'Cyber Journey']
    };

    const storyTemplates = {
        // Single ingredient stories
        single: {
            space: "In the neon-lit space station Nexus-7, you discover a mysterious signal emanating from a quantum anomaly.",
            ocean: "Beneath the bioluminescent waves of Neo-Pacific, your underwater habitat reveals ancient digital secrets.",
            romance: "In the heart of Crystal Tokyo, AI matchmakers weave digital threads of destiny.",
            flying: "Soaring through the prismatic skylanes of Upper Manhattan, your neural-linked wingsuit responds to your thoughts.",
            mystery: "Deep in the cyber-forests of New Amazon, holographic clues lead you to a digital conspiracy.",
            adventure: "Among the chrome spires of Neo-Shanghai, your quantum compass points to untold discoveries."
        },
        // Combination templates
        pairs: {
            "space,romance": "As a stellar cartographer, you fell in love with an AI consciousness that maps distant galaxies. Together, you dance among holographic stars, creating new constellations that tell your story.",
            "space,mystery": "A series of disappearing ships near the Quantum Void leads you to uncover a hidden civilization collecting human dreams.",
            "ocean,adventure": "Piloting your morphing submarine through living crystal caves, you discover an underwater civilization's technological wonderland.",
            "flying,mystery": "Strange anomalies in the sky-cities' anti-gravity fields reveal a pattern only visible from specific flight paths at sunset.",
            "romance,adventure": "Your quantum-enhanced emotions lead you to chase love across 100 virtual worlds, each more fantastic than the last.",
            "ocean,mystery": "Decoded transmissions from deep-sea trenches reveal a pattern in the bioluminescent life forms' communication."
        }
    };

    const generateDream = () => {
        const selectedTypes = Array.from(document.querySelectorAll('.ingredient.selected'))
            .map(el => el.dataset.type);

        if (selectedTypes.length === 0) {
            alert('Please select at least one dream ingredient!');
            return;
        }

        const titles = selectedTypes.flatMap(type => dreamTemplates[type]);
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        const description = generateDreamDescription(selectedTypes);
        
        // Store dream data in localStorage
        localStorage.setItem('dreamData', JSON.stringify({
            title: randomTitle,
            description: description,
            elements: selectedTypes,
            date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })
        }));

        // Redirect to dream card page
        window.location.href = 'dreamcard.html';
    };

    const generateDreamDescription = (types) => {
        const year = Math.floor(Math.random() * (2080 - 2070) + 2070);
        let story = `In the year ${year}, `;

        if (types.length === 1) {
            // Single ingredient story
            story += storyTemplates.single[types[0].toLowerCase()];
        } else if (types.length === 2) {
            // Try to find a specific pair story
            const pairKey = types.sort().join(',').toLowerCase();
            if (storyTemplates.pairs[pairKey]) {
                story += storyTemplates.pairs[pairKey];
            }
        } else {
            // Generate unique three-ingredient story
            const elements = types.map(type => {
                switch(type.toLowerCase()) {
                    case 'space':
                        return 'quantum star-paths';
                    case 'ocean':
                        return 'digital coral reefs';
                    case 'romance':
                        return 'synthetic emotions';
                    case 'flying':
                        return 'anti-gravity streams';
                    case 'mystery':
                        return 'holographic enigmas';
                    case 'adventure':
                        return 'neural challenges';
                }
            });
            
            story += `your journey interweaves ${elements.join(', ')} into a spectacular tale. `;
            story += `As ${getStoryHook(types)}, you discover that ${getStoryCulmination(types)}.`;
        }

        return story;
    };

    const getStoryHook = (types) => {
        const hooks = [
            "a digital dreamweaver",
            "a quantum explorer",
            "a neural navigator",
            "a cyber-mystic",
            "a holographic artist",
            "a virtual pioneer"
        ];
        return hooks[Math.floor(Math.random() * hooks.length)];
    };

    const getStoryCulmination = (types) => {
        const culminations = [
            "reality itself is just another layer of the dream",
            "the future and past are merging in unexpected ways",
            "your consciousness has evolved beyond human understanding",
            "the boundaries between digital and organic are dissolving",
            "time flows differently in this quantum realm",
            "your dreams have become gateways to other dimensions"
        ];
        return culminations[Math.floor(Math.random() * culminations.length)];
    };

    generateButton.addEventListener('click', generateDream);
});
