import react.*
import react.dom.html.ReactHTML.div
import react.dom.html.ReactHTML.li
import react.dom.html.ReactHTML.ul
import react.router.Route
import react.router.Routes
import react.router.dom.BrowserRouter
import react.router.dom.Link

val ReactRouterDomApp = FC<Props> {
    BrowserRouter {
        div {
            ul {
                li {
                    Link {
                        to = "/"
                        +"Home"
                    }
                }
                li {
                    Link {
                        to = "/list"
                        +"List"
                    }
                }
                li {
                    Link {
                        to = "/addProduct"
                        +"Add product"
                    }
                }
            }

            Routes {
                Route {
                    path = "/:id"
                    element = ProductDescription.create()
                }
                Route {
                    path = "/list/editProduct/:id"
                    element = ProductEditing.create()
                }
                Route {
                    path = "/list"
                    element = ProductCatalog.create()
                }
                Route {
                    path = "/addProduct"
                    element = ProductAdditing.create()
                }
                Route {
                    path = "/"
                    element = Index.create()
                }
            }
        }
    }
}