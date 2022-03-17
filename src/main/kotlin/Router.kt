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
            }

            Routes {
                Route {
                    path = "/:id"
                    element = GoodDescription.create()
                }
                Route {
                    path = "/list"
                    element = GoodsList.create()
                }
                Route {
                    path = "/"
                    element = Index.create()
                }
            }
        }
    }
}