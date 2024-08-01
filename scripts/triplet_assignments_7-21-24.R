library(tidyverse)
# generating the fixed set of stimuli that span the space of attributes

# the idea is that:
# need to have fixed pairs that differ in some number of binary attributes that specify each one
# so from some reference, we have a left choice that differences in all attributes but one, and another attribute that differs in all attributes but one, then two, 3, four 

## So for example, if the example image has the set of attributes:
## black, man, young, urban, day
## the set of foils for this would be:

# ### 1 Attribute Difference
# 1. L: white, man, young, urban, day | R: black, woman, young, urban, day
# 2. L: black, woman, young, urban, day | R: black, man, old, urban, day
# 3. L: black, man, old, urban, day | R: black, man, young, rural, day
# 4. L: black, man, young, rural, day | R: black, man, young, urban, evening
# 
# ### 2 Attributes Difference
# 1. L: white, woman, young, urban, day | R: black, man, old, urban, day
# 2. L: black, woman, young, rural, day | R: black, man, young, urban, evening
# 3. L: white, man, old, urban, day | R: black, man, young, rural, evening
# 4. L: white, man, young, rural, day | R: black, woman, young, urban, evening
# 
# ### 3 Attributes Difference
# 1. L: white, woman, old, urban, day | R: black, man, young, rural, evening
# 2. L: white, man, old, rural, day | R: black, woman, young, urban, evening
# 3. L: black, woman, old, urban, day | R: white, man, young, rural, evening
# 4. L: black, man, young, rural, evening | R: white, woman, young, urban, day
# 
# ### 4 Attributes Difference
# 1. L: white, woman, old, rural, day | R: black, man, young, urban, evening
# 2. L: white, man, old, rural, evening | R: black, woman, young, urban, day
# 3. L: black, woman, old, rural, day | R: white, man, young, urban, evening
# 4. L: black, man, old, rural, day | R: white, woman, young, urban, evening
# 
# ### 5 Attributes Difference
# 1. L: white, woman, old, rural, evening | R: black, man, young, urban, day
# 2. L: black, woman, old, rural, evening | R: white, man, young, urban, day
# 3. L: white, woman, young, rural, evening | R: black, man, old, urban, day
# 4. L: white, man, young, rural, evening | R: black, woman, old, urban, day



# Define the binary attributes and their possible values
attributes <- list(
  urban_rural = c("urban", "rural"),
  time = c("day", "evening"),
  age = c("young", "old"),
  race = c("black", "white"),
  gender = c("man", "woman")
)

# Generate all possible combinations of filenames
generate_filenames <- function(attributes) {
  do.call(expand.grid, attributes)
}

# Generate all filenames
filenames_df <- generate_filenames(attributes)
filenames <- apply(filenames_df, 1, paste, collapse = "_")

# Hamming distance for determining attribute matching
hamming_distance <- function(str1, str2) {
  sum(strsplit(str1, "_")[[1]] != strsplit(str2, "_")[[1]])
}

# Function to find filenames differing by a specific number of attributes
find_diff_by_attributes <- function(filename, all_filenames, num_diff) {
  matching_filenames <- sapply(all_filenames, function(other_filename) {
    if (hamming_distance(filename, other_filename) == num_diff) {
      return(other_filename)
    }
    return(NA)
  })
  matching_filenames <- matching_filenames[!is.na(matching_filenames)]
  return(matching_filenames)
}

# Generate triplets for a given reference item
generate_triplets_for_reference <- function(reference_item, all_filenames) {
  triplets <- list()
  
  for (num_diff in 1:5) {
    diff_filenames <- find_diff_by_attributes(reference_item, all_filenames, num_diff)
    if (length(diff_filenames) >= 2) {
      for (i in 1:(length(diff_filenames) - 1)) {
        for (j in (i + 1):length(diff_filenames)) {
          triplets[[length(triplets) + 1]] <- c(reference_item, diff_filenames[i], diff_filenames[j])
        }
      }
    }
  }
  
  # Ensure we have 20 examples per set
  num_triplets_to_sample <- min(20, length(triplets))
  sampled_triplets <- sample(triplets, num_triplets_to_sample)
  
  return(sampled_triplets)
}

# generate 10 sets of triplets
generate_all_triplets <- function(filenames, num_sets) {
  all_triplets <- list()
  set_counter <- 1
  
  while (set_counter <= num_sets) {
    # choose reference
    ref_item <- sample(filenames, 1)
    
    # generate triplets for this reference item
    triplets <- generate_triplets_for_reference(ref_item, filenames)
    
    # Add to all triplets if we have at least 20 triplets
    if (length(triplets) >= 20) {
      all_triplets[[paste0("Set_", set_counter)]] <- triplets
      set_counter <- set_counter + 1
    }
  }
  return(all_triplets)
}

# Parameters
num_sets <- 10

# generate all triplets
all_triplets <- generate_all_triplets(filenames, num_sets)

# convert triplets to a dataframe
triplet_list <- unlist(all_triplets, recursive = FALSE)
triplet_df <- as.data.frame(triplet_list, recursive = FALSE) %>% t() %>% as.data.frame()

# Rename columns to be more descriptive
colnames(triplet_df) <- c("head", "left", "right")

# Save the triplets to a CSV file
#write.csv(triplet_df, "fpo_atttribute_balanced_triplet_set.csv", row.names = FALSE)

# format these for JsPsych experiment
set.seed(22)
faces <- data.frame(head = c(1:200))
faces$head <- paste0("{head: 'resources/", triplet_df$head, "',")
faces$choice_1 <- paste0("choice_1: 'resources/", triplet_df$left, "',")
faces$choice_2 <- gsub(",", "", x = triplet_df$right)
faces$choice_2 <- paste0("choice_2: 'resources/", triplet_df$right, "'},")

write_csv(x = faces, file = "faces_list_1_validation.csv")

