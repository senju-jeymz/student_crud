FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "if [ -n \"$SPRING_DATASOURCE_URL\" ]; then export SPRING_DATASOURCE_URL=$(echo \"$SPRING_DATASOURCE_URL\" | sed 's/^postgres:/jdbc:postgresql:/' | sed 's/^postgresql:/jdbc:postgresql:/'); fi && java -Dserver.port=${PORT:-8080} -jar app.jar"]
