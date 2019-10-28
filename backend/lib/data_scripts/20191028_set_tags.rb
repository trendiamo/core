product_categories = %w[automotive kids beauty fashion accessoires technology food health home cooking creativity
                        work diy entertainment crafting outdoors sports yoga pet media travel finance organisations
                        nutrition]

positive_impact_areas = ["vegan", "cruelty free", "zero waste", "plastic free", "social equality", "no poverty",
                         "mental health", "education", "environment", "community", "clean energy", "fair trade",
                         "ocean", "recycling", "climate", "circular economy", "politics", "sexuality", "well-being",]

product_categories.each { |category| Tag.find_or_create_by!(tag_type: "product_category", name: category) }
positive_impact_areas.each { |area| Tag.find_or_create_by!(tag_type: "positive_impact_area", name: area) }
