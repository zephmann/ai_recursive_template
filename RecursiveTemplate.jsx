
// RecursiveTemplate.jsx
// CustomInk.com
// Zephyr Mann - 2016
//
// template for recursively looping through the layers and items in a file

function RecursiveFunction() {

    // exit if there are no documents open, otherwise save a reference to the active document
    if( !app.documents.length ) return;
    var doc = app.activeDocument;

    doc.selection = null;  // clear any selection


    // ------------ ~ADD VARIABLES HERE~ ---------------------------------------


    // ------------ helper functions -------------------------------------------

    // takes a working pathItem object
    //   fill in this function with whatever you would like to do
    function pathHelper( path ) {

        // ------------  ~PUT CODE HERE~ ---------------------------------------

    }
    // END pathHelper


    // takes a working rasterItem object
    //   fill in this function with whatever you would like to do
    function rasterHelper( raster ) {

        // ------------  ~PUT CODE HERE~ ---------------------------------------

    }
    // END rasterHelper


    // recursive helper function
    function recurseHelper( parent ) {

        // recurse through any sublayers
        if( parent.typename == 'Layer' ) {

            // get a reference to any sublayers
            var layers = parent.layers;
            for( var i = 0, ii = layers.length; i < ii; i++ ) {

                // get a reference to the current sublayer
                var subLayer = layers[i];

                recurseHelper( subLayer );
            }
        }
        // end if parent is a layer

        // recurse thourgh items
        var items = parent.pageItems;
        for( var j = 0, jj = items.length; j < jj; j++ ) {

            var curItem = items[j];  // reference to the current page item
            var curPath = null;        //  a reference to a path item

            // if curItem is a groupItem
            if( curItem.typename == 'GroupItem' ) {

                // recurse through the group
                recurseHelper( curItem );

            } // end if groupItem

            // else if curItem is an image
            else if( curItem.typename == 'RasterItem' ) {

                rasterHelp( curItem );
            } // end if rasterItem

            // else if curItem is a compound path
            else if( curItem.typename == 'CompoundPathItem' ) {

                // check if there are any pathItems available in the compoundPathItem
                if( curItem.pathItems.length == 0 ) {

                    var curSel = doc.selection;
                    doc.selection = null;
                    curItem.selected = true;

                    app.executeMenuCommand( "noCompoundPath" );

                    var pathFound = false;

                    while( !pathFound ) {
                        app.executeMenuCommand( "ungroup" );

                        var temp = doc.selection;
                        for( var i = 0, ii = temp.length; i < ii && !pathFound; i++ ) {
                            if( temp[i].typename == 'PathItem' ) {
                                pathFound = true;
                                curPath = temp[i];
                            }
                        }
                    }

                    app.executeMenuCommand( "compoundPath" );

                    curItem.selected = false;
                    doc.selection = curSel;
                }

                // else there is at least one pathItem we can access
                else {
                    curPath = curItem.pathItems[0];
                }
            } // end if compound path

            // else if curItem is a regular path
            else if( curItem.typename == 'PathItem' ) {

                curPath = curItem;
            } // end if regular path

            // if curItem has a path associated with it, curPath should now not be null
            //    and we can use it to do whatever we need
            if( curPath != null ) {

                // call pathHelper function to operate on current pathItem object
                pathHelper( curPath );
            }
            // end if we have a working path to check

        }
        // end for loop through pageItems

    } // END recurseHelper function

    // -------------------------------------------------------------------------

    var layers = doc.layers;  // reference to top-level layers

    // recurse through top-level layers
    for( var i = 0, ii = layers.length; i < ii; i++ ) {

        // reference to current layer
        var curLayer = layers[i];

        // if the layer is not locked or hidden, recurse through it
        if( curLayer.visible && !curLayer.locked ) {
            recurseHelper( curLayer );
       }
    }

} // END RecursiveFunction

RecursiveFunction();
