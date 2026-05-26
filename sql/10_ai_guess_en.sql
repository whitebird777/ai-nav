-- AI Nav — AI 猜画 English translations
-- 添加英文列 + 20 道题目的英文版数据
-- 在 Supabase SQL Editor 中执行

ALTER TABLE ai_guess_puzzles ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE ai_guess_puzzles ADD COLUMN IF NOT EXISTS options_en TEXT[];
ALTER TABLE ai_guess_puzzles ADD COLUMN IF NOT EXISTS funny_success_text_en TEXT;
ALTER TABLE ai_guess_puzzles ADD COLUMN IF NOT EXISTS funny_fail_text_en TEXT;

-- ==================== 20 puzzles — English ====================

UPDATE ai_guess_puzzles SET
  title_en = 'AI said it drew a cat. What does this look like to you?',
  options_en = ARRAY['A melting cheese pizza', 'A cat contemplating life', 'A squished fuzzy slipper', 'An alien creature baby'],
  funny_success_text_en = 'Correct! This cat is pondering what to eat for dinner. Pure philosophy in those eyes.',
  funny_fail_text_en = 'Haha you didn''t see it? The AI cat is deeply offended. Go retake Feline Morphology 101!'
WHERE id = 1;

UPDATE ai_guess_puzzles SET
  title_en = 'AI was told to draw "the perfect burger." The result…',
  options_en = ARRAY['A Jenga tower collapse scene', 'The perfect burger (AI-certified)', 'A meteorite crashed into a market', 'An architecture student''s final model'],
  funny_success_text_en = 'Congrats! Your aesthetic sense has eerily aligned with the AI. This burger made the "Most Abstract Food of the Year" list.',
  funny_fail_text_en = 'Wrong! The AI insists this IS the perfect burger. We suggest upgrading your "Burger Recognition System."'
WHERE id = 2;

UPDATE ai_guess_puzzles SET
  title_en = 'AI was asked to draw "a cute dog." It delivered—',
  options_en = ARRAY['A hairy toilet', 'A cute dog (probably)', 'An alien spaceship cockpit', 'A windswept mop'],
  funny_success_text_en = 'Yes! This is AI''s vision of a cute dog, even if it looks like it crossed over from another dimension.',
  funny_fail_text_en = 'The AI says: "Your taste is broken, this is clearly a dog!" Maybe stare at it a few more times.'
WHERE id = 3;

UPDATE ai_guess_puzzles SET
  title_en = 'AI drew "a flower." Can you recognize it?',
  options_en = ARRAY['A blooming rose', 'An angry sea urchin', 'A stepped-on cake', 'An abstract artist''s final exam'],
  funny_success_text_en = 'You got it! You''ve mastered the core skill of AI aesthetics—the advanced art of calling a deer a horse.',
  funny_fail_text_en = 'Don''t blame yourself. Even the AI almost couldn''t recognize this "flower." It has achieved the "art is meant to be incomprehensible" level.'
WHERE id = 4;

UPDATE ai_guess_puzzles SET
  title_en = 'AI tried to draw "a sports car." The final product is—',
  options_en = ARRAY['A toy car run over by a steamroller', 'A concept sports car from 3024', 'A leather shoe that grew wheels', 'An extremely abstract sports car (AI Limited Edition)'],
  funny_success_text_en = 'Incredible! You''ve successfully decoded the AI''s train of thought. It IS a sports car—because the AI says so.',
  funny_fail_text_en = 'The AI says: this is the most car-like drawing I''ve ever done! How about YOU try drawing one?'
WHERE id = 5;

UPDATE ai_guess_puzzles SET
  title_en = 'AI drew "a horse." Guess correctly and you win—',
  options_en = ARRAY['A table with four legs', 'A horse doing yoga', 'An alien''s sketch of Earth life', 'Wind-blown cotton candy'],
  funny_success_text_en = 'You win! This horse is doing downward dog. Welcome to the AI Yoga Studio!',
  funny_fail_text_en = 'Even the AI thought you''d guess wrong. Its horse-drawing skill is on par with a 3-year-old drawing an elephant.'
WHERE id = 6;

UPDATE ai_guess_puzzles SET
  title_en = 'AI was ordered to draw "a human face" and created—',
  options_en = ARRAY['A reincarnated Picasso piece', 'A human face (if you squint)', 'A squashed lump of dough', 'Horror movie poster material'],
  funny_success_text_en = 'Congrats! Your AI art appreciation has surpassed 90% of humans. Go apply for a job at an art museum.',
  funny_fail_text_en = 'The AI says this is its self-portrait, and you didn''t recognize it? The AI is heartbroken. It''ll draw something handsomer next time.'
WHERE id = 7;

UPDATE ai_guess_puzzles SET
  title_en = 'AI''s understanding of "watermelon" is a bit special—',
  options_en = ARRAY['A green basketball', 'Watermelon in AI''s eyes (isekai edition)', 'A bowling ball painted green', 'A daydreaming cabbage'],
  funny_success_text_en = 'Correct! Welcome to the AI Fruit World, where watermelons might turn into pumpkin carriages at midnight.',
  funny_fail_text_en = 'Pfft—the AI says if it calls it a watermelon, then it''s a watermelon. Why are you arguing with a program?'
WHERE id = 8;

UPDATE ai_guess_puzzles SET
  title_en = 'Based on the word "rainbow," AI drew—',
  options_en = ARRAY['A spilled paint palette', 'A very half-hearted rainbow', 'A colorful noodle mishmash', 'The pinnacle of abstract art'],
  funny_success_text_en = 'Genius! You instantly saw through the AI''s artistic ambition. If this went to auction, the starting bid would be at least ten million.',
  funny_fail_text_en = 'The AI defiantly says: "You do better then!" Fine—seven colors squished together basically looks like this, right?'
WHERE id = 9;

UPDATE ai_guess_puzzles SET
  title_en = 'AI''s grasp of "dinosaur" is at the level of—',
  options_en = ARRAY['A chicken in a suit', 'AI''s imagined dinosaur (unverified version)', 'A flying sofa', 'A crocodile lying on its back'],
  funny_success_text_en = 'Correct! Major AI archaeology breakthrough: dinosaurs were just chickens in suits. Paleontology has been turned upside down.',
  funny_fail_text_en = 'Hahaha, the AI says this is the most dinosaur-like thing it learned from watching every dinosaur movie ever. Do you believe it?'
WHERE id = 10;

UPDATE ai_guess_puzzles SET
  title_en = 'AI drew "a bowl of noodles." The art style took a turn—',
  options_en = ARRAY['Alien food documentary screenshot', 'A tangled ball of yarn', 'A bowl of noodles (AI thinks this is fine)', 'Beard competition champion entry'],
  funny_success_text_en = 'Bingo! AI Food Channel is now open. The signature dish is this "tangled yarn noodle bowl." Enjoy your meal.',
  funny_fail_text_en = 'AI Chef explains: this is molecular gastronomy. Mortals not understanding is perfectly normal. Eat a few more bowls and you''ll get used to it.'
WHERE id = 11;

UPDATE ai_guess_puzzles SET
  title_en = 'AI tried to draw "an airplane." The result is—',
  options_en = ARRAY['A rejected origami contest entry', 'A kite blown crooked by the wind', 'An airplane (AI says "close enough")', 'A bird having an existential crisis'],
  funny_success_text_en = 'You got it! Welcome to AI Airlines, where planes fly entirely on imagination.',
  funny_fail_text_en = 'AI shrugs: "Aren''t all planes like this? A metal tube with two wings, no problem!"'
WHERE id = 12;

UPDATE ai_guess_puzzles SET
  title_en = 'AI drew "a castle." This is the fortress in its mind—',
  options_en = ARRAY['Grand champion of a sand sculpture contest', 'AI King''s dream castle (structurally unsound edition)', 'Lego bricks on drugs', 'A tent stomped by a giant'],
  funny_success_text_en = 'Exactly! Welcome to the AI Kingdom. This castle might collapse at any moment, but it IS a castle.',
  funny_fail_text_en = 'The AI architect once said: "As long as the heart believes it''s a castle, it''s a castle." Your imagination needs work!'
WHERE id = 13;

UPDATE ai_guess_puzzles SET
  title_en = 'When asked to draw "a tree," AI produced—',
  options_en = ARRAY['A green lollipop', 'AI Environmental Certificate application piece', 'A lightning-struck telephone pole', 'Dancing seaweed'],
  funny_success_text_en = 'You got it! AI Botanical Garden is now open. All trees here are lollipop-flavored. Come taste one!',
  funny_fail_text_en = 'The AI says: "This is the most tree-like tree I''ve ever seen!" Clearly the AI hasn''t seen many trees.'
WHERE id = 14;

UPDATE ai_guess_puzzles SET
  title_en = 'AI drew "a fish." This is everything it has learned—',
  options_en = ARRAY['Photo editing software crash scene', 'Armored slippers', 'The crown jewel of AI Aquarium', 'An overinflated balloon'],
  funny_success_text_en = 'Correct! AI Aquarium is having a sale today. This fish has been inducted into the "World''s Top 10 Mystery Creatures."',
  funny_fail_text_en = 'AI ichthyologist states: "Don''t all fish look like this? Scales and fins—that''s a fish!" Your fish membership has been revoked.'
WHERE id = 15;

UPDATE ai_guess_puzzles SET
  title_en = 'AI drew "a ship." Would you dare board it—',
  options_en = ARRAY['A leaking iron bucket', 'AI Navigation Company''s flagship product', 'A floating cardboard box', 'A turtle flipped on its back'],
  funny_success_text_en = 'Welcome aboard! The AI Titanic''s maiden voyage is imminent. Tickets are free. Arriving at shore is optional.',
  funny_fail_text_en = 'The AI captain roars: "This is clearly a perfect battleship!" Then the ship promptly capsized on its own.'
WHERE id = 16;

UPDATE ai_guess_puzzles SET
  title_en = 'AI tried to draw "a mountain." The result looks like—',
  options_en = ARRAY['A giant blob of matcha ice cream', 'AI Geology Institute''s latest finding', 'A steamed bun cut in half', 'A crumpled green paper ball'],
  funny_success_text_en = 'Correct! Welcome to the AI Geology Institute, where all mountains are made of ice cream and melt when it gets warm.',
  funny_fail_text_en = 'AI geologist says: "Isn''t a mountain just that lumpy thing sticking up from the ground?" Well… you''re not entirely wrong.'
WHERE id = 17;

UPDATE ai_guess_puzzles SET
  title_en = 'AI tried hard to draw "a rabbit" and then messed up—',
  options_en = ARRAY['A marshmallow that grew ears', 'AI Year of the Rabbit limited blind box', 'A sock inflated by a bicycle pump', 'A badminton shuttlecock taking off'],
  funny_success_text_en = 'Congrats! You''ve pulled the AI Rabbit Year limited edition. Collect all twelve zodiac signs to redeem one AI girlfriend.',
  funny_fail_text_en = 'The AI says this rabbit is a limited edition. Only one in the whole world looks like this. You should feel honored!'
WHERE id = 18;

UPDATE ai_guess_puzzles SET
  title_en = 'AI''s understanding of "piano"... how to put this—',
  options_en = ARRAY['A crooked comb', 'AI Music Academy entrance assignment', 'A chocolate bar caught in a door', 'An alien''s musical instrument diagram'],
  funny_success_text_en = 'Genius! AI Music Academy has admitted you as an honorary student. Required course: "How to Play Piano While Looking at a Comb."',
  funny_fail_text_en = 'AI music teacher says: "The black and white keys are all there, how is this not a piano?" Then it produced a very strange noise.'
WHERE id = 19;

UPDATE ai_guess_puzzles SET
  title_en = 'AI''s final challenge—drawing "a table"—',
  options_en = ARRAY['Four legs in a cutthroat competition', 'AI Furniture Store clearance item', 'A drunk rectangle', 'A squashed spider'],
  funny_success_text_en = 'Awesome! AI Furniture Store has reserved a VIP seat for you. This table is buy-one-get-three-free—each leg sold separately.',
  funny_fail_text_en = 'AI carpenter says: "A table just needs four legs and a flat top, right?" Then all four legs ran off in different directions.'
WHERE id = 20;
