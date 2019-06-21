# .filter

names = [ "bob", "larry", "bob", "carol" ]

def bobs( ):
    new_list = [ ]
    for name in names:
        if name == "bob":
            new_list.append( name )
    return new_list

print( bobs( ) )

# Function with generic list given
def any_list( old_list ):
    new_list = [ ]
    for name in old_list:
        if name == "bob":
            new_list.append( name )
    return new_list

print( any_list( names ) )

# Generic question
def is_bob( name ):
    return name == "bob"

def filter( old_list, question ):
    new_list = [ ]
    for item in old_list:
        if question( item ):
            new_list.append( item )
    return new_list

print( filter( names, is_bob ) )

# some
print( len( filter( names, is_bob ) ) > 0 )
# every
print( len( filter( names, is_bob ) ) == len( names ) )
