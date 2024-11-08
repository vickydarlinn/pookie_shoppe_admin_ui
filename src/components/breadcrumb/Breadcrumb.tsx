import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";

const BreadcrumbC = () => {
  const { pathname } = useLocation();
  const pathNames = pathname.split("/").filter((x) => x);
  return (
    <Breadcrumb className=" py-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink to="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {pathNames.map((path, i) => {
          if (i < pathNames.length - 1) {
            return (
              <Fragment key={`${i}-${path}`}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink to={path}>{path}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            );
          }
          return (
            <Fragment key={`${i}-${path}`}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{path}</BreadcrumbPage>
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbC;
